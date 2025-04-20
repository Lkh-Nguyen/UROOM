const Hotel = require("../../models/hotel");
const Room = require("../../models/room");
const Reservation = require("../../models/reservation");
const HotelService = require("../../models/hotelService");
const { HOTEL } = require("../../utils/constantMessage");
const { calculateAvgRatingHotel } = require("../Feedback/FeedbackController");
const Facility = require("../../models/hotelFacility");
const User = require("../../models/user");

exports.searchAndFilterHotels = async (req, res) => {
  try {
    const {
      hotelName,
      address,
      checkinDate,
      checkoutDate,
      star,
      district,
      numberOfPeople,
      serviceNames,
      selectedFacilities,
      page = 1,
      limit = 3,
    } = req.query;

    let user = null;
    if (req.user && req.user._id) {
      user = await User.findById(req.user._id);
      if (!user) {
        console.warn("User from token not found, proceeding without user.");
      }
    }

    let query = { adminStatus: "APPROVED", ownerStatus: "ACTIVE" };

    if (selectedFacilities !== "") {
      const facilityArray = selectedFacilities.split(",").map((f) => f.trim());
      const facilities = await Facility.find({
        name: {
          $in: facilityArray.map((name) => new RegExp(`^${name}$`, "i")),
        },
      });
      if (facilities.length > 0) {
        const facilityIds = facilities.map((f) => f._id);
        query.facilities = { $in: facilityIds };
      } else {
        return res.status(200).json({
          error: false,
          hotels: [],
          totalPages: 0,
          currentPage: Number(page),
          message: "Không tìm thấy khách sạn với các tiện nghi đã chọn",
        });
      }
    }

    if (hotelName) {
      query.hotelName = { $regex: hotelName, $options: "i" };
    }

    const andConditions = [];

    if (address) {
      andConditions.push({ address: { $regex: address, $options: "i" } });
    }

    if (district) {
      andConditions.push({ address: { $regex: district, $options: "i" } });
    }

    if (andConditions.length > 0) {
      query.$and = andConditions;
    }

    if (star) {
      if (star === 0) {
        // Không lọc theo star
      } else if (/^\d$/.test(star) && Number(star) >= 1 && Number(star) <= 5) {
        query.star = Number(star);
      }
    }

    if (serviceNames) {
      const serviceArray = serviceNames.split(",");
      const services = await HotelService.find({
        name: { $in: serviceArray.map((name) => new RegExp(`^${name}$`, "i")) },
      });
      query.services = { $in: services.map((s) => s._id) };
    }

    const allHotels = await Hotel.find(query)
      .populate("services")
      .populate("facilities");

    const hotelsWithRooms = await Promise.all(
      allHotels.map(async (hotel) => {
        const rooms = await Room.find({ hotel: hotel._id });
        return { hotel, rooms };
      })
    );

    let finalHotels = [];

    if (checkinDate && checkoutDate) {
      const overlappingReservations = await Reservation.find({
        $and: [
          { checkInDate: { $lt: new Date(checkoutDate) } },
          { checkOutDate: { $gt: new Date(checkinDate) } },
        ],
      });

      const reservedRoomIds = overlappingReservations.flatMap((reservation) =>
        reservation.rooms.map((room) => room.room.toString())
      );

      let finalHotelTemps = await Promise.all(
        hotelsWithRooms.map(async ({ hotel, rooms }) => {
          const { avgValueRating, totalFeedbacks } =
            await calculateAvgRatingHotel(hotel._id);

          const availableRooms = rooms.filter(
            (room) => !reservedRoomIds.includes(room._id.toString())
          );
          const totalCapacity = availableRooms.reduce(
            (sum, room) => sum + room.capacity,
            0
          );

          const isFavorite = user
            ? user.favorites.includes(hotel._id.toString())
            : false;

          return {
            isFavorite,
            avgValueRating,
            totalFeedbacks,
            hotel,
            availableRooms,
            totalCapacity,
          };
        })
      );

      finalHotels = finalHotelTemps.filter(
        ({ totalCapacity }) => totalCapacity >= Number(numberOfPeople)
      );
    } else {
      finalHotels = await Promise.all(
        hotelsWithRooms.map(async ({ hotel, rooms }) => {
          const { avgValueRating, totalFeedbacks } =
            await calculateAvgRatingHotel(hotel._id);

          const totalCapacity = rooms.reduce(
            (sum, room) => sum + room.capacity,
            0
          );

          const isFavorite = user
            ? user.favorites.includes(hotel._id.toString())
            : false;

          return {
            isFavorite,
            avgValueRating,
            totalFeedbacks,
            hotel,
            availableRooms: rooms,
            totalCapacity,
          };
        })
      );

      finalHotels = finalHotels.filter(
        ({ totalCapacity }) => totalCapacity >= Number(numberOfPeople)
      );
    }

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const paginatedHotels = finalHotels.slice(startIndex, endIndex);

    return res.status(200).json({
      error: false,
      hotels: paginatedHotels,
      totalPages: Math.ceil(finalHotels.length / limit),
      currentPage: Number(page),
      message: HOTEL.SUCCESS,
    });
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({
      error: true,
      message: error.message || "Internal server error",
    });
  }
};