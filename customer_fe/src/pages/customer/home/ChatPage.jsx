import { FaArrowLeft, FaPaperPlane } from "react-icons/fa";
import { IoArrowBack } from "react-icons/io5";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
function CustomerChat() {
  // Styles object
  const styles = {
    body: {
      margin: 0,
      fontFamily:
        "'Nunito', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
      backgroundColor: "#f8f9fa",
      overflowX: "hidden",
    },
    container: {
      display: "flex",
      height: "100vh",
      backgroundColor: "#fff",
    },
    sidebar: {
      width: "320px",
      borderRight: "1px solid #e9ecef",
      display: "flex",
      flexDirection: "column",
      backgroundColor: "#fff",
    },
    sidebarHeader: {
      padding: "15px",
      borderBottom: "1px solid #e9ecef",
    },
    sidebarTitle: {
      fontSize: "1.2rem",
      fontWeight: 600,
      marginBottom: "15px",
    },
    search: {
      position: "relative",
    },
    searchInput: {
      width: "100%",
      padding: "10px 15px 10px 40px",
      border: "1px solid #e9ecef",
      borderRadius: "50px",
      backgroundColor: "#f8f9fa",
    },
    searchInputFocus: {
      outline: "none",
      borderColor: "#0d6efd",
    },
    searchIcon: {
      position: "absolute",
      left: "15px",
      top: "50%",
      transform: "translateY(-50%)",
      color: "#6c757d",
    },
    hotelList: {
      flex: 1,
      overflowY: "auto",
      padding: "10px 0",
    },
    hotelItem: {
      padding: "12px 15px",
      display: "flex",
      alignItems: "center",
      borderBottom: "1px solid #f8f9fa",
      cursor: "pointer",
      transition: "background-color 0.2s",
      position: "relative",
    },
    hotelItemHover: {
      backgroundColor: "#f8f9fa",
    },
    hotelItemActive: {
      backgroundColor: "#e9f5ff",
      borderLeft: "3px solid #0d6efd",
    },
    hotelAvatar: {
      width: "50px",
      height: "50px",
      borderRadius: "50%",
      marginRight: "15px",
      position: "relative",
    },
    hotelAvatarImg: {
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      objectFit: "cover",
    },
    onlineIndicator: {
      width: "12px",
      height: "12px",
      borderRadius: "50%",
      border: "2px solid #fff",
      position: "absolute",
      bottom: 0,
      right: 0,
    },
    onlineIndicatorOnline: {
      backgroundColor: "#20c997",
    },
    onlineIndicatorOffline: {
      backgroundColor: "#6c757d",
    },
    hotelInfo: {
      flex: 1,
      minWidth: 0,
    },
    hotelName: {
      fontWeight: 600,
      marginBottom: "3px",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
    },
    hotelLastMessage: {
      fontSize: "0.85rem",
      color: "#6c757d",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
    },
    hotelMeta: {
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-end",
      marginLeft: "10px",
    },
    hotelTime: {
      fontSize: "0.75rem",
      color: "#6c757d",
      marginBottom: "5px",
    },
    hotelUnread: {
      backgroundColor: "#0d6efd",
      color: "#fff",
      fontSize: "0.7rem",
      fontWeight: 600,
      width: "20px",
      height: "20px",
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    main: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
    },
    header: {
      padding: "15px 20px",
      borderBottom: "1px solid #e9ecef",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      backgroundColor: "#fff",
    },
    headerInfo: {
      display: "flex",
      alignItems: "center",
    },
    avatar: {
      width: "50px",
      height: "50px",
      borderRadius: "50%",
      marginRight: "15px",
      position: "relative",
    },
    avatarImg: {
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      objectFit: "cover",
    },
    headerActions: {
      display: "flex",
      gap: "15px",
    },
    headerActionsButton: {
      background: "none",
      border: "none",
      color: "#6c757d",
      fontSize: "1.2rem",
      cursor: "pointer",
      transition: "color 0.2s",
    },
    headerActionsButtonHover: {
      color: "#0d6efd",
    },
    bookingSummary: {
      padding: "15px 20px",
      backgroundColor: "#f8f9fa",
      borderBottom: "1px solid #e9ecef",
    },
    bookingHeader: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "10px",
    },
    bookingTitle: {
      fontSize: "0.9rem",
      fontWeight: 600,
      margin: 0,
    },
    bookingStatus: {
      padding: "3px 10px",
      borderRadius: "50px",
      fontSize: "0.75rem",
      fontWeight: 600,
    },
    bookingStatusPending: {
      backgroundColor: "#fff3cd",
      color: "#856404",
    },
    bookingStatusConfirmed: {
      backgroundColor: "#d4edda",
      color: "#155724",
    },
    bookingStatusCancelled: {
      backgroundColor: "#f8d7da",
      color: "#721c24",
    },
    bookingDetails: {
      display: "flex",
      flexWrap: "wrap",
      gap: "10px",
      fontSize: "0.85rem",
    },
    bookingDetail: {
      backgroundColor: "#fff",
      padding: "8px 12px",
      borderRadius: "5px",
      boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
    },
    bookingLabel: {
      fontWeight: 600,
      marginRight: "5px",
    },
    messages: {
      flex: 1,
      padding: "20px",
      overflowY: "auto",
      backgroundColor: "#f8f9fa",
    },
    dateDivider: {
      textAlign: "center",
      margin: "20px 0",
      position: "relative",
    },
    dateDividerSpan: {
      backgroundColor: "#f8f9fa",
      padding: "0 10px",
      fontSize: "0.8rem",
      color: "#6c757d",
      position: "relative",
      zIndex: 1,
    },
    dateDividerBefore: {
      content: "''",
      position: "absolute",
      top: "50%",
      left: 0,
      right: 0,
      height: "1px",
      backgroundColor: "#e9ecef",
      zIndex: 0,
    },
    message: {
      display: "flex",
      marginBottom: "20px",
    },
    messageCustomer: {
      justifyContent: "flex-end",
    },
    messageHotel: {
      justifyContent: "flex-start",
    },
    messageContent: {
      maxWidth: "70%",
      padding: "12px 15px",
      borderRadius: "18px",
      position: "relative",
    },
    messageContentCustomer: {
      backgroundColor: "#0d6efd",
      color: "#fff",
      borderBottomRightRadius: "4px",
    },
    messageContentHotel: {
      backgroundColor: "#e9ecef",
      color: "#212529",
      borderBottomLeftRadius: "4px",
    },
    messageTime: {
      fontSize: "0.7rem",
      marginTop: "5px",
      textAlign: "right",
      opacity: 0.8,
    },
    messageStatus: {
      display: "flex",
      justifyContent: "flex-end",
      fontSize: "0.7rem",
      marginTop: "2px",
      color: "#6c757d",
    },
    messageStatusIcon: {
      fontSize: "0.8rem",
      marginLeft: "3px",
    },
    bookingInfo: {
      backgroundColor: "#fff",
      border: "1px solid #e9ecef",
      borderRadius: "10px",
      padding: "15px",
      marginBottom: "20px",
      boxShadow: "0 2px 5px rgba(0, 0, 0, 0.05)",
      maxWidth: "80%",
    },
    bookingInfoDetails: {
      display: "grid",
      gridTemplateColumns: "repeat(2, 1fr)",
      gap: "10px",
    },
    bookingInfoDetail: {
      marginBottom: "5px",
    },
    bookingInfoLabel: {
      fontSize: "0.8rem",
      color: "#6c757d",
      marginBottom: "3px",
    },
    bookingInfoValue: {
      fontWeight: 600,
    },
    bookingPrice: {
      marginTop: "10px",
      paddingTop: "10px",
      borderTop: "1px solid #e9ecef",
    },
    input: {
      padding: "15px 20px",
      borderTop: "1px solid #e9ecef",
      backgroundColor: "#fff",
    },
    inputForm: {
      display: "flex",
      alignItems: "center",
    },
    inputActions: {
      display: "flex",
      gap: "10px",
      marginRight: "15px",
    },
    inputActionsButton: {
      background: "none",
      border: "none",
      color: "#6c757d",
      fontSize: "1.2rem",
      cursor: "pointer",
      transition: "color 0.2s",
    },
    inputActionsButtonHover: {
      color: "#0d6efd",
    },
    inputField: {
      flex: 1,
      position: "relative",
    },
    inputFieldTextarea: {
      width: "100%",
      padding: "12px 15px",
      border: "1px solid #e9ecef",
      borderRadius: "24px",
      resize: "none",
      maxHeight: "100px",
      backgroundColor: "#f8f9fa",
    },
    inputFieldTextareaFocus: {
      outline: "none",
      borderColor: "#0d6efd",
    },
    sendButton: {
      marginLeft: "15px",
      width: "45px",
      height: "45px",
      borderRadius: "50%",
      backgroundColor: "#0d6efd",
      color: "#fff",
      border: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      transition: "background-color 0.2s",
    },
    sendButtonHover: {
      backgroundColor: "#0b5ed7",
    },
    sendButtonIcon: {
      fontSize: "1.2rem",
    },
    emptyState: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "100%",
      padding: "20px",
      textAlign: "center",
      color: "#6c757d",
    },
    emptyStateIcon: {
      fontSize: "4rem",
      marginBottom: "20px",
      color: "#e9ecef",
    },
    emptyStateTitle: {
      fontSize: "1.5rem",
      marginBottom: "10px",
    },
    emptyStateText: {
      maxWidth: "400px",
    },
    backButton: {
      background: "none",
      border: "none",
      color: "#6c757d",
      fontSize: "1.5rem",
      cursor: "pointer",
      marginRight: "10px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    // Media queries would be handled in CSS or with conditional styling in React
  };

  // Danh sách khách sạn
  const [hotels, setHotels] = useState([
    {
      id: 1,
      name: "Luxury Palace Hotel",
      avatar:
        "https://i.pinimg.com/474x/b0/6c/0c/b06c0c7272f29e971f3ec48d40616eaa.jpg",
      status: "online",
      lastSeen: "Trực tuyến",
      lastMessage:
        "Cảm ơn quý khách đã cung cấp thông tin. Chúng tôi đã tạo đơn đặt phòng tạm thời.",
      lastMessageTime: "10:42 AM",
      unread: 2,
      booking: {
        id: "BK-20250715-001",
        roomType: "Deluxe Double",
        checkIn: "15/07/2025",
        checkOut: "18/07/2025",
        nights: 3,
        guests: 2,
        price: "2,500,000 VND/đêm",
        total: "7,500,000 VND",
        deposit: "3,750,000 VND",
        status: "Chờ xác nhận",
      },
    },
    {
      id: 2,
      name: "Seaside Resort & Spa",
      avatar:
        "https://i.pinimg.com/474x/f1/c1/b4/f1c1b4f4397722b6af4b729c11c1e248.jpg",
      status: "online",
      lastSeen: "Trực tuyến",
      lastMessage:
        "Quý khách có thể thanh toán số tiền còn lại khi nhận phòng.",
      lastMessageTime: "09:12 AM",
      unread: 0,
      booking: {
        id: "BK-20250710-002",
        roomType: "Superior Twin",
        checkIn: "10/07/2025",
        checkOut: "12/07/2025",
        nights: 2,
        guests: 2,
        price: "1,800,000 VND/đêm",
        total: "3,600,000 VND",
        deposit: "1,800,000 VND",
        status: "Đã xác nhận",
      },
    },
    {
      id: 3,
      name: "Mountain View Lodge",
      avatar:
        "https://i.pinimg.com/736x/4d/38/7a/4d387a41ccd0476cb0fb7a07ee695d7e.jpg",
      status: "offline",
      lastSeen: "Hoạt động 2 giờ trước",
      lastMessage:
        "Chúng tôi rất tiếc về việc này. Theo chính sách hủy phòng của chúng tôi...",
      lastMessageTime: "Hôm qua",
      unread: 0,
      booking: {
        id: "BK-20250720-003",
        roomType: "Executive Suite",
        checkIn: "20/07/2025",
        checkOut: "25/07/2025",
        nights: 5,
        guests: 2,
        price: "3,500,000 VND/đêm",
        total: "17,500,000 VND",
        deposit: "8,750,000 VND",
        status: "Chờ xác nhận",
      },
    },
    {
      id: 4,
      name: "City Center Hotel",
      avatar:
        "https://i.pinimg.com/736x/56/16/02/5616027b1979631b785759c3873ead1d.jpg",
      status: "online",
      lastSeen: "Trực tuyến",
      lastMessage:
        "Vâng, chúng tôi có dịch vụ đưa đón sân bay. Phí dịch vụ là 500,000 VND/chiều.",
      lastMessageTime: "08:35 AM",
      unread: 1,
      booking: {
        id: "BK-20250805-004",
        roomType: "Family Room",
        checkIn: "05/08/2025",
        checkOut: "10/08/2025",
        nights: 5,
        guests: 4,
        price: "3,200,000 VND/đêm",
        total: "16,000,000 VND",
        deposit: "8,000,000 VND",
        status: "Đã xác nhận",
      },
    },
    {
      id: 5,
      name: "Riverside Boutique Hotel",
      avatar:
        "https://i.pinimg.com/736x/c9/1a/67/c91a674790b0d444744ab6da190a4453.jpg",
      status: "offline",
      lastSeen: "Hoạt động 1 ngày trước",
      lastMessage: "Quý khách có thể nhận phòng từ 14:00 ngày 30/06/2025.",
      lastMessageTime: "2 ngày trước",
      unread: 0,
      booking: {
        id: "BK-20250630-005",
        roomType: "Deluxe Single",
        checkIn: "30/06/2025",
        checkOut: "02/07/2025",
        nights: 2,
        guests: 1,
        price: "1,500,000 VND/đêm",
        total: "3,000,000 VND",
        deposit: "1,500,000 VND",
        status: "Đã xác nhận",
      },
    },
  ]);

  // Khách sạn đang được chọn
  const [selectedHotel, setSelectedHotel] = useState(hotels[0]);

  // State for mobile view
  const [showSidebar, setShowSidebar] = useState(true);

  // Tin nhắn cho từng khách sạn
  const [hotelMessages, setHotelMessages] = useState({
    1: [
      {
        id: 1,
        sender: "hotel",
        text: "Xin chào, tôi có thể giúp gì cho quý khách?",
        time: "10:30 AM",
        date: "Hôm nay",
        status: "seen",
      },
      {
        id: 2,
        sender: "customer",
        text: "Xin chào, tôi muốn đặt phòng Deluxe vào ngày 15/7 đến 18/7 cho 2 người.",
        time: "10:32 AM",
        date: "Hôm nay",
      },
      {
        id: 3,
        sender: "hotel",
        text: "Dạ, chúng tôi có phòng Deluxe Double vào ngày 15/7 đến 18/7. Giá phòng là 2,500,000 VND/đêm, đã bao gồm bữa sáng cho 2 người.",
        time: "10:35 AM",
        date: "Hôm nay",
        status: "seen",
      },
      {
        id: 4,
        sender: "customer",
        text: "Giá cả hợp lý. Tôi có thể đặt phòng ngay bây giờ không?",
        time: "10:36 AM",
        date: "Hôm nay",
      },
      {
        id: 5,
        sender: "hotel",
        text: "Dạ, quý khách có thể đặt phòng ngay bây giờ. Chúng tôi cần một số thông tin để xác nhận đặt phòng:",
        time: "10:37 AM",
        date: "Hôm nay",
        status: "seen",
      },
      {
        id: 6,
        sender: "hotel",
        text: "1. Họ và tên đầy đủ\n2. Email\n3. Số điện thoại\n4. Thời gian check-in dự kiến\n5. Phương thức thanh toán (Trả trước 50% hoặc thanh toán khi nhận phòng)",
        time: "10:38 AM",
        date: "Hôm nay",
        status: "seen",
      },
      {
        id: 7,
        sender: "customer",
        text: "Thông tin của tôi như sau:\n1. Nguyễn Văn A\n2. nguyenvana@email.com\n3. 0901234567\n4. Check-in khoảng 14:00 ngày 15/7\n5. Tôi sẽ trả trước 50%",
        time: "10:40 AM",
        date: "Hôm nay",
      },
      {
        id: 8,
        sender: "hotel",
        text: "Cảm ơn quý khách đã cung cấp thông tin. Chúng tôi đã tạo đơn đặt phòng tạm thời. Quý khách vui lòng thanh toán 50% (3,750,000 VND) qua chuyển khoản hoặc thẻ tín dụng để xác nhận đặt phòng.",
        time: "10:42 AM",
        date: "Hôm nay",
        status: "seen",
      },
      {
        id: 9,
        sender: "hotel",
        isBookingInfo: true,
        booking: {
          id: "BK-20250715-001",
          roomType: "Deluxe Double",
          checkIn: "15/07/2025",
          checkOut: "18/07/2025",
          nights: 3,
          guests: 2,
          price: "2,500,000 VND/đêm",
          total: "7,500,000 VND",
          deposit: "3,750,000 VND",
          status: "Chờ thanh toán",
        },
        time: "10:43 AM",
        date: "Hôm nay",
      },
    ],
    2: [
      {
        id: 1,
        sender: "hotel",
        text: "Xin chào, cảm ơn quý khách đã đặt phòng tại khách sạn chúng tôi.",
        time: "09:00 AM",
        date: "Hôm nay",
        status: "seen",
      },
      {
        id: 2,
        sender: "customer",
        text: "Xin chào, tôi đã đặt phòng Superior Twin từ ngày 10/7 đến 12/7. Tôi muốn xác nhận lại đặt phòng của mình.",
        time: "09:05 AM",
        date: "Hôm nay",
      },
      {
        id: 3,
        sender: "hotel",
        text: "Dạ, chúng tôi đã nhận được đặt phòng của quý khách. Đơn đặt phòng của quý khách đã được xác nhận. Dưới đây là thông tin chi tiết:",
        time: "09:07 AM",
        date: "Hôm nay",
        status: "seen",
      },
      {
        id: 4,
        sender: "hotel",
        isBookingInfo: true,
        booking: {
          id: "BK-20250710-002",
          roomType: "Superior Twin",
          checkIn: "10/07/2025",
          checkOut: "12/07/2025",
          nights: 2,
          guests: 2,
          price: "1,800,000 VND/đêm",
          total: "3,600,000 VND",
          deposit: "1,800,000 VND",
          status: "Đã xác nhận",
        },
        time: "09:08 AM",
        date: "Hôm nay",
      },
      {
        id: 5,
        sender: "customer",
        text: "Cảm ơn. Tôi cần thanh toán số tiền còn lại khi nào?",
        time: "09:10 AM",
        date: "Hôm nay",
      },
      {
        id: 6,
        sender: "hotel",
        text: "Quý khách có thể thanh toán số tiền còn lại khi nhận phòng. Chúng tôi chấp nhận thanh toán bằng tiền mặt, thẻ tín dụng hoặc chuyển khoản.",
        time: "09:12 AM",
        date: "Hôm nay",
        status: "seen",
      },
    ],
    3: [
      {
        id: 1,
        sender: "customer",
        text: "Xin chào, tôi muốn hủy đặt phòng Executive Suite từ ngày 20/7 đến 25/7.",
        time: "15:30 PM",
        date: "Hôm qua",
      },
      {
        id: 2,
        sender: "hotel",
        text: "Xin chào quý khách. Rất tiếc khi nghe quý khách muốn hủy đặt phòng. Có thể cho chúng tôi biết lý do hủy không ạ?",
        time: "15:35 PM",
        date: "Hôm qua",
        status: "seen",
      },
      {
        id: 3,
        sender: "customer",
        text: "Tôi có việc đột xuất nên không thể đi được.",
        time: "15:40 PM",
        date: "Hôm qua",
      },
      {
        id: 4,
        sender: "hotel",
        text: "Chúng tôi rất tiếc về việc này. Theo chính sách hủy phòng của chúng tôi, nếu quý khách hủy trước 7 ngày so với ngày nhận phòng, quý khách sẽ được hoàn lại 70% tiền đặt cọc.",
        time: "15:45 PM",
        date: "Hôm qua",
        status: "seen",
      },
    ],
    4: [
      {
        id: 1,
        sender: "customer",
        text: "Xin chào, khách sạn có dịch vụ đưa đón sân bay không?",
        time: "08:30 AM",
        date: "Hôm nay",
      },
      {
        id: 2,
        sender: "hotel",
        text: "Xin chào quý khách. Vâng, chúng tôi có dịch vụ đưa đón sân bay. Phí dịch vụ là 500,000 VND/chiều. Quý khách cần đưa đón vào ngày nào ạ?",
        time: "08:35 AM",
        date: "Hôm nay",
        status: "seen",
      },
    ],
    5: [
      {
        id: 1,
        sender: "hotel",
        text: "Xin chào quý khách. Chúng tôi xin xác nhận đặt phòng của quý khách đã được hoàn tất. Quý khách có thể nhận phòng từ 14:00 ngày 30/06/2025.",
        time: "10:00 AM",
        date: "2 ngày trước",
        status: "seen",
      },
      {
        id: 2,
        sender: "customer",
        text: "Cảm ơn, tôi sẽ đến đúng giờ",
        time: "10:30 AM",
        date: "2 ngày trước",
      },
    ],
  });

  // Tin nhắn mới
  const [newMessage, setNewMessage] = useState("");

  // Ref cho container tin nhắn để scroll xuống cuối
  const messagesEndRef = useRef(null);

  // Hàm scroll xuống cuối danh sách tin nhắn
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Scroll xuống cuối khi tin nhắn thay đổi hoặc chọn khách sạn khác
  useEffect(() => {
    scrollToBottom();
  }, [hotelMessages, selectedHotel]);

  // Gửi tin nhắn
  const sendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim() === "") return;

    const hotelId = selectedHotel.id;
    const messages = hotelMessages[hotelId] || [];

    const newMsg = {
      id: messages.length + 1,
      sender: "customer",
      text: newMessage,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      date: "Hôm nay",
    };

    setHotelMessages({
      ...hotelMessages,
      [hotelId]: [...messages, newMsg],
    });

    // Cập nhật tin nhắn cuối cùng trong danh sách khách sạn
    setHotels((prevHotels) =>
      prevHotels.map((hotel) =>
        hotel.id === hotelId
          ? {
              ...hotel,
              lastMessage: newMessage,
              lastMessageTime: "Vừa xong",
            }
          : hotel
      )
    );

    setNewMessage("");

    // Giả lập phản hồi từ khách sạn sau 2 giây
    setTimeout(() => {
      const hotelReply = {
        id: messages.length + 2,
        sender: "hotel",
        text: "Cảm ơn quý khách đã liên hệ. Chúng tôi sẽ phản hồi sớm nhất có thể.",
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        date: "Hôm nay",
        status: "sent",
      };

      setHotelMessages((prevMessages) => ({
        ...prevMessages,
        [hotelId]: [...prevMessages[hotelId], hotelReply],
      }));

      // Cập nhật tin nhắn cuối cùng và số tin nhắn chưa đọc
      setHotels((prevHotels) =>
        prevHotels.map((hotel) =>
          hotel.id === hotelId
            ? {
                ...hotel,
                lastMessage: hotelReply.text,
                lastMessageTime: hotelReply.time,
                unread: hotel.unread + 1,
              }
            : hotel
        )
      );

      // Cập nhật trạng thái "đã xem" cho tin nhắn của khách sạn
      setTimeout(() => {
        setHotelMessages((prevMessages) => {
          const updatedMessages = prevMessages[hotelId].map((msg) =>
            msg.id === hotelReply.id ? { ...msg, status: "seen" } : msg
          );

          return {
            ...prevMessages,
            [hotelId]: updatedMessages,
          };
        });
      }, 1000);
    }, 2000);
  };

  // Chọn khách sạn
  const selectHotel = (hotel) => {
    setSelectedHotel(hotel);
    setShowSidebar(false); // Hide sidebar on mobile after selecting a hotel

    // Đánh dấu tin nhắn đã đọc
    setHotels((prevHotels) =>
      prevHotels.map((h) => (h.id === hotel.id ? { ...h, unread: 0 } : h))
    );
  };

  // Tìm kiếm khách sạn
  const [searchTerm, setSearchTerm] = useState("");
  const filteredHotels = hotels.filter((hotel) =>
    hotel.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Toggle sidebar for mobile view
  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  // Check if we're on mobile
  const isMobile = () => {
    return window.innerWidth <= 768;
  };

  // Set initial sidebar state based on screen size
  useEffect(() => {
    const handleResize = () => {
      if (isMobile()) {
        setShowSidebar(true);
      } else {
        setShowSidebar(true);
      }
    };

    // Set initial state
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Clean up
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      {/* Sidebar - Danh sách khách sạn */}
      {(showSidebar || !isMobile()) && (
        <div style={styles.sidebar}>
          <div style={styles.sidebarHeader}>
            <h5 style={styles.sidebarTitle}>
              Chat box
            </h5>
            <div style={styles.search}>
              <i style={styles.searchIcon} className="bi bi-search"></i>
              <input
                style={styles.searchInput}
                type="text"
                placeholder="Tìm kiếm khách sạn..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div style={styles.hotelList}>
            {filteredHotels.map((hotel) => (
              <div
                key={hotel.id}
                style={{
                  ...styles.hotelItem,
                  ...(selectedHotel.id === hotel.id
                    ? styles.hotelItemActive
                    : {}),
                }}
                onClick={() => selectHotel(hotel)}
              >
                <div style={styles.hotelAvatar}>
                  <img
                    style={styles.hotelAvatarImg}
                    src={hotel.avatar || "/placeholder.svg"}
                    alt={hotel.name}
                  />
                  <div
                    style={{
                      ...styles.onlineIndicator,
                      ...(hotel.status === "online"
                        ? styles.onlineIndicatorOnline
                        : styles.onlineIndicatorOffline),
                    }}
                  ></div>
                </div>
                <div style={styles.hotelInfo}>
                  <div style={styles.hotelName}>{hotel.name}</div>
                  <div style={styles.hotelLastMessage}>{hotel.lastMessage}</div>
                </div>
                <div style={styles.hotelMeta}>
                  <div style={styles.hotelTime}>{hotel.lastMessageTime}</div>
                  {hotel.unread > 0 && (
                    <div style={styles.hotelUnread}>{hotel.unread}</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Main Chat Area */}
      <div style={styles.main}>
        {/* Header - Thông tin khách sạn */}
        <div style={styles.header}>
          <div style={styles.headerInfo}>
            {isMobile() && (
              <button style={styles.backButton} onClick={toggleSidebar}>
                <IoArrowBack />
              </button>
            )}
            <div style={styles.avatar}>
              <img
                style={styles.avatarImg}
                src={selectedHotel.avatar || "/placeholder.svg"}
                alt={selectedHotel.name}
              />
              <div
                style={{
                  ...styles.onlineIndicator,
                  ...(selectedHotel.status === "online"
                    ? styles.onlineIndicatorOnline
                    : styles.onlineIndicatorOffline),
                }}
              ></div>
            </div>
            <div>
              <h5 style={{ margin: 0 }}>{selectedHotel.name}</h5>
              <small style={{ color: "#6c757d" }}>
                {selectedHotel.lastSeen}
              </small>
            </div>
          </div>
          <div style={styles.headerActions}>
            <button style={styles.headerActionsButton} title="Gọi điện">
              <i className="bi bi-telephone"></i>
            </button>
            <button
              style={styles.headerActionsButton}
              title="Thông tin khách sạn"
            >
              <i className="bi bi-info-circle"></i>
            </button>
            <button style={styles.headerActionsButton} title="Tùy chọn khác">
              <i className="bi bi-three-dots-vertical"></i>
            </button>
          </div>
        </div>

        {/* Thông tin đặt phòng */}
        <div style={styles.bookingSummary}>
          <div style={styles.bookingHeader}>
            <h6 style={styles.bookingTitle}>
              Đặt phòng #{selectedHotel.booking.id}
            </h6>
            <span
              style={{
                ...styles.bookingStatus,
                ...(selectedHotel.booking.status === "Chờ xác nhận" ||
                selectedHotel.booking.status === "Chờ thanh toán"
                  ? styles.bookingStatusPending
                  : selectedHotel.booking.status === "Đã xác nhận"
                  ? styles.bookingStatusConfirmed
                  : styles.bookingStatusCancelled),
              }}
            >
              {selectedHotel.booking.status}
            </span>
          </div>
          <div style={styles.bookingDetails}>
            <div style={styles.bookingDetail}>
              <span style={styles.bookingLabel}>Phòng:</span>
              <span>{selectedHotel.booking.roomType}</span>
            </div>
            <div style={styles.bookingDetail}>
              <span style={styles.bookingLabel}>Check-in:</span>
              <span>{selectedHotel.booking.checkIn}</span>
            </div>
            <div style={styles.bookingDetail}>
              <span style={styles.bookingLabel}>Check-out:</span>
              <span>{selectedHotel.booking.checkOut}</span>
            </div>
            <div style={styles.bookingDetail}>
              <span style={styles.bookingLabel}>Khách:</span>
              <span>{selectedHotel.booking.guests} người</span>
            </div>
          </div>
        </div>

        {/* Khu vực tin nhắn */}
        <div style={styles.messages}>
          {hotelMessages[selectedHotel.id] &&
          hotelMessages[selectedHotel.id].length > 0 ? (
            <>
              <div style={styles.dateDivider}>
                <span style={styles.dateDividerSpan}>Hôm nay</span>
              </div>

              {hotelMessages[selectedHotel.id].map((message) => (
                <div
                  key={message.id}
                  style={{
                    ...styles.message,
                    ...(message.sender === "customer"
                      ? styles.messageCustomer
                      : styles.messageHotel),
                  }}
                >
                  <div
                    style={{
                      ...styles.messageContent,
                      ...(message.sender === "customer"
                        ? styles.messageContentCustomer
                        : styles.messageContentHotel),
                    }}
                  >
                    {message.isBookingInfo ? (
                      <div style={styles.bookingInfo}>
                        <div style={styles.bookingHeader}>
                          <h6 style={styles.bookingTitle}>
                            Thông tin đặt phòng #{message.booking.id}
                          </h6>
                          <span
                            style={{
                              ...styles.bookingStatus,
                              ...(message.booking.status === "Chờ xác nhận" ||
                              message.booking.status === "Chờ thanh toán"
                                ? styles.bookingStatusPending
                                : message.booking.status === "Đã xác nhận"
                                ? styles.bookingStatusConfirmed
                                : styles.bookingStatusCancelled),
                            }}
                          >
                            {message.booking.status}
                          </span>
                        </div>
                        <div style={styles.bookingInfoDetails}>
                          <div style={styles.bookingInfoDetail}>
                            <div style={styles.bookingInfoLabel}>
                              Loại phòng
                            </div>
                            <div style={styles.bookingInfoValue}>
                              {message.booking.roomType}
                            </div>
                          </div>
                          <div style={styles.bookingInfoDetail}>
                            <div style={styles.bookingInfoLabel}>Số khách</div>
                            <div style={styles.bookingInfoValue}>
                              {message.booking.guests} người
                            </div>
                          </div>
                          <div style={styles.bookingInfoDetail}>
                            <div style={styles.bookingInfoLabel}>
                              Nhận phòng
                            </div>
                            <div style={styles.bookingInfoValue}>
                              {message.booking.checkIn}
                            </div>
                          </div>
                          <div style={styles.bookingInfoDetail}>
                            <div style={styles.bookingInfoLabel}>Trả phòng</div>
                            <div style={styles.bookingInfoValue}>
                              {message.booking.checkOut}
                            </div>
                          </div>
                        </div>
                        <div style={styles.bookingPrice}>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              marginBottom: "8px",
                            }}
                          >
                            <span>Giá phòng:</span>
                            <span>{message.booking.price}</span>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              marginBottom: "8px",
                            }}
                          >
                            <span>Số đêm:</span>
                            <span>{message.booking.nights} đêm</span>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              marginBottom: "8px",
                              fontWeight: "bold",
                            }}
                          >
                            <span>Tổng cộng:</span>
                            <span>{message.booking.total}</span>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <span>Đặt cọc (50%):</span>
                            <span>{message.booking.deposit}</span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div style={{ whiteSpace: "pre-line" }}>
                          {message.text}
                        </div>
                        <div style={styles.messageTime}>{message.time}</div>
                      </>
                    )}
                  </div>
                </div>
              ))}

              {/* Hiển thị trạng thái tin nhắn (đã gửi, đã xem) */}
              {hotelMessages[selectedHotel.id]
                .filter((m) => m.sender === "hotel" && m.status)
                .map((message, index, array) => {
                  // Chỉ hiển thị trạng thái cho tin nhắn cuối cùng của khách sạn
                  if (index === array.length - 1) {
                    return (
                      <div
                        key={`status-${message.id}`}
                        style={styles.messageStatus}
                      >
                        {message.status === "sent" ? (
                          <>
                            Đã gửi{" "}
                            <i
                              style={styles.messageStatusIcon}
                              className="bi bi-check"
                            ></i>
                          </>
                        ) : message.status === "seen" ? (
                          <>
                            Đã xem{" "}
                            <i
                              style={styles.messageStatusIcon}
                              className="bi bi-check-all"
                            ></i>
                          </>
                        ) : null}
                      </div>
                    );
                  }
                  return null;
                })}
            </>
          ) : (
            <div style={styles.emptyState}>
              <i style={styles.emptyStateIcon} className="bi bi-chat-dots"></i>
              <h3 style={styles.emptyStateTitle}>Không có tin nhắn</h3>
              <p style={styles.emptyStateText}>
                Bắt đầu cuộc trò chuyện với khách sạn bằng cách gửi tin nhắn đầu
                tiên.
              </p>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Khu vực nhập tin nhắn */}
        <div style={styles.input}>
          <form style={styles.inputForm} onSubmit={sendMessage}>
            <div style={styles.inputActions}>
              <button
                style={styles.inputActionsButton}
                type="button"
                title="Đính kèm file"
              >
                <i className="bi bi-paperclip"></i>
              </button>
              <button
                style={styles.inputActionsButton}
                type="button"
                title="Gửi hình ảnh"
              >
                <i className="bi bi-image"></i>
              </button>
              <button
                style={styles.inputActionsButton}
                type="button"
                title="Gửi vị trí"
              >
                <i className="bi bi-geo-alt"></i>
              </button>
            </div>
            <div style={styles.inputField}>
              <textarea
                style={styles.inputFieldTextarea}
                placeholder="Nhập tin nhắn..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                rows="1"
              ></textarea>
            </div>
            <button style={styles.sendButton} type="submit">
              <FaPaperPlane />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CustomerChat;
