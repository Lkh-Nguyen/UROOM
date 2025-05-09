import "bootstrap-icons/font/bootstrap-icons.css";
import { useState, useEffect, useRef } from "react"

function Chat() {
  // Danh sách khách hàng
  const [customers, setCustomers] = useState([
    {
      id: 1,
      name: "Nguyễn Văn A",
      avatar: "https://i.pinimg.com/474x/51/e6/bd/51e6bd130a7508392e9d070941152c31.jpg",
      status: "online",
      lastSeen: "Trực tuyến",
      lastMessage: "Tôi sẽ trả trước 50%",
      lastMessageTime: "10:40 AM",
      unread: 0,
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
      name: "Trần Thị B",
      avatar: "https://i.pinimg.com/736x/35/97/1f/35971f887d68bc73cf593d50fa9535a2.jpg",
      status: "offline",
      lastSeen: "Hoạt động 30 phút trước",
      lastMessage: "Cảm ơn, tôi sẽ chuyển khoản ngay",
      lastMessageTime: "09:15 AM",
      unread: 2,
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
      name: "Lê Văn C",
      avatar: "https://i.pinimg.com/736x/69/02/f6/6902f6bc2d8a88f19ce7ee339a25fbee.jpg",
      status: "offline",
      lastSeen: "Hoạt động 2 giờ trước",
      lastMessage: "Tôi muốn hủy đặt phòng",
      lastMessageTime: "Hôm qua",
      unread: 1,
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
      name: "Phạm Thị D",
      avatar: "https://i.pinimg.com/736x/28/ed/68/28ed6863418004827265c6188017ed49.jpg",
      status: "online",
      lastSeen: "Trực tuyến",
      lastMessage: "Khách sạn có dịch vụ đưa đón sân bay không?",
      lastMessageTime: "08:30 AM",
      unread: 0,
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
      name: "Hoàng Văn E",
      avatar: "https://i.pinimg.com/736x/19/52/2b/19522b001b1164b9ef9c95577cc71579.jpg",
      status: "offline",
      lastSeen: "Hoạt động 1 ngày trước",
      lastMessage: "Cảm ơn, tôi sẽ đến đúng giờ",
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
  ])

  // Khách hàng đang được chọn
  const [selectedCustomer, setSelectedCustomer] = useState(customers[0])

  // Tin nhắn cho từng khách hàng
  const [customerMessages, setCustomerMessages] = useState({
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
      {
        id: 7,
        sender: "customer",
        text: "Cảm ơn, tôi sẽ chuyển khoản ngay",
        time: "09:15 AM",
        date: "Hôm nay",
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
      {
        id: 5,
        sender: "customer",
        text: "Tôi muốn hủy đặt phòng",
        time: "16:00 PM",
        date: "Hôm qua",
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
  })

  // Tin nhắn mới
  const [newMessage, setNewMessage] = useState("")

  // Ref cho container tin nhắn để scroll xuống cuối
  const messagesEndRef = useRef(null)

  // Hàm scroll xuống cuối danh sách tin nhắn
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  // Scroll xuống cuối khi tin nhắn thay đổi hoặc chọn khách hàng khác
  useEffect(() => {
    scrollToBottom()
  }, [customerMessages, selectedCustomer])

  // Gửi tin nhắn
  const sendMessage = (e) => {
    e.preventDefault()
    if (newMessage.trim() === "") return

    const customerId = selectedCustomer.id
    const messages = customerMessages[customerId] || []

    const newMsg = {
      id: messages.length + 1,
      sender: "hotel",
      text: newMessage,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      date: "Hôm nay",
      status: "sent",
    }

    setCustomerMessages({
      ...customerMessages,
      [customerId]: [...messages, newMsg],
    })
    setNewMessage("")

    // Giả lập phản hồi từ khách hàng sau 2 giây
    setTimeout(() => {
      const customerReply = {
        id: messages.length + 2,
        sender: "customer",
        text: "Cảm ơn bạn đã phản hồi. Tôi sẽ xem xét thông tin và liên hệ lại sau.",
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        date: "Hôm nay",
      }

      setCustomerMessages((prevMessages) => ({
        ...prevMessages,
        [customerId]: [...prevMessages[customerId], customerReply],
      }))

      // Cập nhật trạng thái "đã xem" cho tin nhắn của chủ khách sạn
      setTimeout(() => {
        setCustomerMessages((prevMessages) => {
          const updatedMessages = prevMessages[customerId].map((msg) =>
            msg.id === newMsg.id ? { ...msg, status: "seen" } : msg,
          )

          return {
            ...prevMessages,
            [customerId]: updatedMessages,
          }
        })
      }, 1000)
    }, 2000)
  }

  // Chọn khách hàng
  const selectCustomer = (customer) => {
    setSelectedCustomer(customer)

    // Đánh dấu tin nhắn đã đọc
    setCustomers((prevCustomers) => prevCustomers.map((c) => (c.id === customer.id ? { ...c, unread: 0 } : c)))
  }

  // Tìm kiếm khách hàng
  const [searchTerm, setSearchTerm] = useState("")
  const filteredCustomers = customers.filter((customer) =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <>
      <style>
        {`
          body {
            margin: 0;
            font-family: 'Nunito', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            overflow-x: hidden;
          }
          
          .hotel-chat-container {
            display: flex;
            height: 97vh;
          }
          
          .hotel-chat-sidebar {
            width: 320px;
            border-right: 1px solid #e9ecef;
            display: flex;
            flex-direction: column;
            background-color: #fff;
          }
          
          .hotel-chat-sidebar-header {
            padding: 15px;
            border-bottom: 1px solid #e9ecef;
          }
          
          .hotel-chat-sidebar-title {
            font-size: 1.2rem;
            font-weight: 600;
            margin-bottom: 15px;
          }
          
          .hotel-chat-search {
            position: relative;
          }
          
          .hotel-chat-search input {
            width: 100%;
            padding: 10px 15px 10px 40px;
            border: 1px solid #e9ecef;
            border-radius: 50px;
            background-color: #f8f9fa;
          }
          
          .hotel-chat-search input:focus {
            outline: none;
            border-color: #0d6efd;
          }
          
          .hotel-chat-search i {
            position: absolute;
            left: 15px;
            top: 50%;
            transform: translateY(-50%);
            color: #6c757d;
          }
          
          .hotel-chat-customer-list {
            flex: 1;
            overflow-y: auto;
            padding: 10px 0;
          }
          
          .hotel-chat-customer-item {
            padding: 12px 15px;
            display: flex;
            align-items: center;
            border-bottom: 1px solid #f8f9fa;
            cursor: pointer;
            transition: background-color 0.2s;
            position: relative;
          }
          
          .hotel-chat-customer-item:hover {
            background-color: #f8f9fa;
          }
          
          .hotel-chat-customer-item.active {
            background-color: #e9f5ff;
            border-left: 3px solid #0d6efd;
          }
          
          .hotel-chat-customer-avatar {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            margin-right: 15px;
            position: relative;
          }
          
          .hotel-chat-customer-avatar img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
            object-fit: cover;
          }
          
          .hotel-chat-customer-online-indicator {
            width: 12px;
            height: 12px;
            border-radius: 50%;
            border: 2px solid #fff;
            position: absolute;
            bottom: 0;
            right: 0;
          }
          
          .hotel-chat-customer-online-indicator.online {
            background-color: #20c997;
          }
          
          .hotel-chat-customer-online-indicator.offline {
            background-color: #6c757d;
          }
          
          .hotel-chat-customer-info {
            flex: 1;
            min-width: 0;
          }
          
          .hotel-chat-customer-name {
            font-weight: 600;
            margin-bottom: 3px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          
          .hotel-chat-customer-last-message {
            font-size: 0.85rem;
            color: #6c757d;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          
          .hotel-chat-customer-meta {
            display: flex;
            flex-direction: column;
            align-items: flex-end;
            margin-left: 10px;
          }
          
          .hotel-chat-customer-time {
            font-size: 0.75rem;
            color: #6c757d;
            margin-bottom: 5px;
          }
          
          .hotel-chat-customer-unread {
            background-color: #0d6efd;
            color: #fff;
            font-size: 0.7rem;
            font-weight: 600;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          
          .hotel-chat-main {
            flex: 1;
            display: flex;
            flex-direction: column;
          }
          
          .hotel-chat-header {
            padding: 15px 20px;
            border-bottom: 1px solid #e9ecef;
            display: flex;
            align-items: center;
            justify-content: space-between;
            background-color: #fff;
          }
          
          .hotel-chat-header-info {
            display: flex;
            align-items: center;
          }
          
          .hotel-chat-avatar {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            margin-right: 15px;
            position: relative;
          }
          
          .hotel-chat-avatar img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
            object-fit: cover;
          }
          
          .hotel-chat-online-indicator {
            width: 12px;
            height: 12px;
            background-color: #20c997;
            border-radius: 50%;
            border: 2px solid #fff;
            position: absolute;
            bottom: 0;
            right: 0;
          }
          
          .hotel-chat-online-indicator.offline {
            background-color: #6c757d;
          }
          
          .hotel-chat-header-actions {
            display: flex;
            gap: 15px;
          }
          
          .hotel-chat-header-actions button {
            background: none;
            border: none;
            color: #6c757d;
            font-size: 1.2rem;
            cursor: pointer;
            transition: color 0.2s;
          }
          
          .hotel-chat-header-actions button:hover {
            color: #0d6efd;
          }
          
          .hotel-chat-booking-summary {
            padding: 15px 20px;
            background-color: #f8f9fa;
            border-bottom: 1px solid #e9ecef;
          }
          
          .hotel-chat-booking-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 10px;
          }
          
          .hotel-chat-booking-title {
            font-size: 0.9rem;
            font-weight: 600;
            margin: 0;
          }
          
          .hotel-chat-booking-status {
            padding: 3px 10px;
            border-radius: 50px;
            font-size: 0.75rem;
            font-weight: 600;
          }
          
          .hotel-chat-booking-status.pending {
            background-color: #fff3cd;
            color: #856404;
          }
          
          .hotel-chat-booking-status.confirmed {
            background-color: #d4edda;
            color: #155724;
          }
          
          .hotel-chat-booking-status.cancelled {
            background-color: #f8d7da;
            color: #721c24;
          }
          
          .hotel-chat-booking-details {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
            font-size: 0.85rem;
          }
          
          .hotel-chat-booking-detail {
            background-color: #fff;
            padding: 8px 12px;
            border-radius: 5px;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          }
          
          .hotel-chat-booking-label {
            font-weight: 600;
            margin-right: 5px;
          }
          
          .hotel-chat-messages {
            flex: 1;
            padding: 20px;
            overflow-y: auto;
            background-color: #f8f9fa;
          }
          
          .hotel-chat-date-divider {
            text-align: center;
            margin: 20px 0;
            position: relative;
          }
          
          .hotel-chat-date-divider span {
            background-color: #f8f9fa;
            padding: 0 10px;
            font-size: 0.8rem;
            color: #6c757d;
            position: relative;
            z-index: 1;
          }
          
          .hotel-chat-date-divider::before {
            content: '';
            position: absolute;
            top: 50%;
            left: 0;
            right: 0;
            height: 1px;
            background-color: #e9ecef;
            z-index: 0;
          }
          
          .hotel-chat-message {
            display: flex;
            margin-bottom: 20px;
          }
          
          .hotel-chat-message.hotel {
            justify-content: flex-end;
          }
          
          .hotel-chat-message.customer {
            justify-content: flex-start;
          }
          
          .hotel-chat-message-content {
            max-width: 70%;
            padding: 12px 15px;
            border-radius: 18px;
            position: relative;
          }
          
          .hotel-chat-message.hotel .hotel-chat-message-content {
            background-color: #0d6efd;
            color: #fff;
            border-bottom-right-radius: 4px;
          }
          
          .hotel-chat-message.customer .hotel-chat-message-content {
            background-color: #e9ecef;
            color: #212529;
            border-bottom-left-radius: 4px;
          }
          
          .hotel-chat-message-time {
            font-size: 0.7rem;
            margin-top: 5px;
            text-align: right;
            opacity: 0.8;
          }
          
          .hotel-chat-message-status {
            display: flex;
            justify-content: flex-end;
            font-size: 0.7rem;
            margin-top: 2px;
            color: #6c757d;
          }
          
          .hotel-chat-message-status i {
            font-size: 0.8rem;
            margin-left: 3px;
          }
          
          .hotel-chat-booking-info {
            background-color: #fff;
            border: 1px solid #e9ecef;
            border-radius: 10px;
            padding: 15px;
            margin-bottom: 20px;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
            max-width: 80%;
          }
          
          .hotel-chat-booking-header {
            display: flex;
            justify-content: space-between;
            margin-bottom: 10px;
            padding-bottom: 10px;
            border-bottom: 1px solid #e9ecef;
          }
          
          .hotel-chat-booking-title {
            font-weight: 600;
            margin: 0;
          }
          
          .hotel-chat-booking-info-details {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 10px;
          }
          
          .hotel-chat-booking-info-detail {
            margin-bottom: 5px;
          }
          
          .hotel-chat-booking-info-label {
            font-size: 0.8rem;
            color: #6c757d;
            margin-bottom: 3px;
          }
          
          .hotel-chat-booking-info-value {
            font-weight: 600;
          }
          
          .hotel-chat-booking-price {
            margin-top: 10px;
            padding-top: 10px;
            border-top: 1px solid #e9ecef;
          }
          
          .hotel-chat-input {
            padding: 15px 20px;
            border-top: 1px solid #e9ecef;
            background-color: #fff;
          }
          
          .hotel-chat-input form {
            display: flex;
            align-items: center;
          }
          
          .hotel-chat-input-actions {
            display: flex;
            gap: 10px;
            margin-right: 15px;
          }
          
          .hotel-chat-input-actions button {
            background: none;
            border: none;
            color: #6c757d;
            font-size: 1.2rem;
            cursor: pointer;
            transition: color 0.2s;
          }
          
          .hotel-chat-input-actions button:hover {
            color: #0d6efd;
          }
          
          .hotel-chat-input-field {
            flex: 1;
            position: relative;
          }
          
          .hotel-chat-input-field textarea {
            width: 100%;
            padding: 12px 15px;
            border: 1px solid #e9ecef;
            border-radius: 24px;
            resize: none;
            max-height: 100px;
            background-color: #f8f9fa;
          }
          
          .hotel-chat-input-field textarea:focus {
            outline: none;
            border-color: #0d6efd;
          }
          
          .hotel-chat-send-button {
            margin-left: 15px;
            width: 45px;
            height: 45px;
            border-radius: 50%;
            background-color: #0d6efd;
            color: #fff;
            border: none;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: background-color 0.2s;
          }
          
          .hotel-chat-send-button:hover {
            background-color: #0b5ed7;
          }
          
          .hotel-chat-send-button i {
            font-size: 1.2rem;
          }
          
          .hotel-chat-empty-state {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 100%;
            padding: 20px;
            text-align: center;
            color: #6c757d;
          }
          
          .hotel-chat-empty-state i {
            font-size: 4rem;
            margin-bottom: 20px;
            color: #e9ecef;
          }
          
          .hotel-chat-empty-state h3 {
            font-size: 1.5rem;
            margin-bottom: 10px;
          }
          
          .hotel-chat-empty-state p {
            max-width: 400px;
          }
          
          @media (max-width: 992px) {
            .hotel-chat-sidebar {
              width: 280px;
            }
          }
          
          @media (max-width: 768px) {
            .hotel-chat-container {
              flex-direction: column;
            }
            
            .hotel-chat-sidebar {
              width: 100%;
              height: 60px;
              flex-direction: row;
              align-items: center;
              padding: 0 15px;
            }
            
            .hotel-chat-sidebar-header {
              width: 100%;
              padding: 10px 0;
              border-bottom: none;
            }
            
            .hotel-chat-sidebar-title {
              display: none;
            }
            
            .hotel-chat-search {
              width: 100%;
            }
            
            .hotel-chat-customer-list {
              display: none;
            }
            
            .hotel-chat-main {
              height: calc(100vh - 60px);
            }
            
            .hotel-chat-message-content {
              max-width: 85%;
            }
            
            .hotel-chat-booking-info {
              max-width: 90%;
            }
            
            .hotel-chat-booking-info-details {
              grid-template-columns: 1fr;
            }
          }
        `}
      </style>

      <div className="hotel-chat-container">
        {/* Sidebar - Danh sách khách hàng */}
        <div className="hotel-chat-sidebar">
          <div className="hotel-chat-sidebar-header">
            <h5 className="hotel-chat-sidebar-title">Tin nhắn</h5>
            <div className="hotel-chat-search">
              <i className="bi bi-search"></i>
              <input
                type="text"
                placeholder="Tìm kiếm khách hàng..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="hotel-chat-customer-list">
            {filteredCustomers.map((customer) => (
              <div
                key={customer.id}
                className={`hotel-chat-customer-item ${selectedCustomer.id === customer.id ? "active" : ""}`}
                onClick={() => selectCustomer(customer)}
              >
                <div className="hotel-chat-customer-avatar">
                  <img src={customer.avatar || "/placeholder.svg"} alt={customer.name} />
                  <div className={`hotel-chat-customer-online-indicator ${customer.status}`}></div>
                </div>
                <div className="hotel-chat-customer-info">
                  <div className="hotel-chat-customer-name">{customer.name}</div>
                  <div className="hotel-chat-customer-last-message">{customer.lastMessage}</div>
                </div>
                <div className="hotel-chat-customer-meta">
                  <div className="hotel-chat-customer-time">{customer.lastMessageTime}</div>
                  {customer.unread > 0 && <div className="hotel-chat-customer-unread">{customer.unread}</div>}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Chat Area */}
        <div className="hotel-chat-main">
          {/* Header - Thông tin khách hàng */}
          <div className="hotel-chat-header">
            <div className="hotel-chat-header-info">
              <div className="hotel-chat-avatar">
                <img src={selectedCustomer.avatar || "/placeholder.svg"} alt={selectedCustomer.name} />
                <div className={`hotel-chat-online-indicator ${selectedCustomer.status}`}></div>
              </div>
              <div>
                <h5 className="mb-0">{selectedCustomer.name}</h5>
                <small className="text-muted">{selectedCustomer.lastSeen}</small>
              </div>
            </div>
            <div className="hotel-chat-header-actions">
              <button title="Gọi điện">
                <i className="bi bi-telephone"></i>
              </button>
              <button title="Thông tin khách hàng">
                <i className="bi bi-info-circle"></i>
              </button>
              <button title="Tùy chọn khác">
                <i className="bi bi-three-dots-vertical"></i>
              </button>
            </div>
          </div>

          {/* Thông tin đặt phòng */}
          <div className="hotel-chat-booking-summary">
            <div className="hotel-chat-booking-header">
              <h6 className="hotel-chat-booking-title">Đặt phòng #{selectedCustomer.booking.id}</h6>
              <span
                className={`hotel-chat-booking-status ${
                  selectedCustomer.booking.status === "Chờ xác nhận" ||
                  selectedCustomer.booking.status === "Chờ thanh toán"
                    ? "pending"
                    : selectedCustomer.booking.status === "Đã xác nhận"
                      ? "confirmed"
                      : "cancelled"
                }`}
              >
                {selectedCustomer.booking.status}
              </span>
            </div>
            <div className="hotel-chat-booking-details">
              <div className="hotel-chat-booking-detail">
                <span className="hotel-chat-booking-label">Phòng:</span>
                <span>{selectedCustomer.booking.roomType}</span>
              </div>
              <div className="hotel-chat-booking-detail">
                <span className="hotel-chat-booking-label">Check-in:</span>
                <span>{selectedCustomer.booking.checkIn}</span>
              </div>
              <div className="hotel-chat-booking-detail">
                <span className="hotel-chat-booking-label">Check-out:</span>
                <span>{selectedCustomer.booking.checkOut}</span>
              </div>
              <div className="hotel-chat-booking-detail">
                <span className="hotel-chat-booking-label">Khách:</span>
                <span>{selectedCustomer.booking.guests} người</span>
              </div>
            </div>
          </div>

          {/* Khu vực tin nhắn */}
          <div className="hotel-chat-messages">
            {customerMessages[selectedCustomer.id] && customerMessages[selectedCustomer.id].length > 0 ? (
              <>
                <div className="hotel-chat-date-divider">
                  <span>Hôm nay</span>
                </div>

                {customerMessages[selectedCustomer.id].map((message) => (
                  <div key={message.id} className={`hotel-chat-message ${message.sender}`}>
                    <div className="hotel-chat-message-content">
                      {message.isBookingInfo ? (
                        <div className="hotel-chat-booking-info">
                          <div className="hotel-chat-booking-header">
                            <h6 className="hotel-chat-booking-title">Thông tin đặt phòng #{message.booking.id}</h6>
                            <span
                              className={`hotel-chat-booking-status ${
                                message.booking.status === "Chờ xác nhận" || message.booking.status === "Chờ thanh toán"
                                  ? "pending"
                                  : message.booking.status === "Đã xác nhận"
                                    ? "confirmed"
                                    : "cancelled"
                              }`}
                            >
                              {message.booking.status}
                            </span>
                          </div>
                          <div className="hotel-chat-booking-info-details">
                            <div className="hotel-chat-booking-info-detail">
                              <div className="hotel-chat-booking-info-label">Loại phòng</div>
                              <div className="hotel-chat-booking-info-value">{message.booking.roomType}</div>
                            </div>
                            <div className="hotel-chat-booking-info-detail">
                              <div className="hotel-chat-booking-info-label">Số khách</div>
                              <div className="hotel-chat-booking-info-value">{message.booking.guests} người</div>
                            </div>
                            <div className="hotel-chat-booking-info-detail">
                              <div className="hotel-chat-booking-info-label">Nhận phòng</div>
                              <div className="hotel-chat-booking-info-value">{message.booking.checkIn}</div>
                            </div>
                            <div className="hotel-chat-booking-info-detail">
                              <div className="hotel-chat-booking-info-label">Trả phòng</div>
                              <div className="hotel-chat-booking-info-value">{message.booking.checkOut}</div>
                            </div>
                          </div>
                          <div className="hotel-chat-booking-price">
                            <div className="d-flex justify-content-between mb-2">
                              <span>Giá phòng:</span>
                              <span>{message.booking.price}</span>
                            </div>
                            <div className="d-flex justify-content-between mb-2">
                              <span>Số đêm:</span>
                              <span>{message.booking.nights} đêm</span>
                            </div>
                            <div className="d-flex justify-content-between mb-2">
                              <span className="fw-bold">Tổng cộng:</span>
                              <span className="fw-bold">{message.booking.total}</span>
                            </div>
                            <div className="d-flex justify-content-between">
                              <span>Đặt cọc (50%):</span>
                              <span>{message.booking.deposit}</span>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <>
                          <div style={{ whiteSpace: "pre-line" }}>{message.text}</div>
                          <div className="hotel-chat-message-time">{message.time}</div>
                        </>
                      )}
                    </div>
                  </div>
                ))}

                {/* Hiển thị trạng thái tin nhắn (đã gửi, đã xem) */}
                {customerMessages[selectedCustomer.id]
                  .filter((m) => m.sender === "hotel" && m.status)
                  .map((message, index, array) => {
                    // Chỉ hiển thị trạng thái cho tin nhắn cuối cùng của chủ khách sạn
                    if (index === array.length - 1) {
                      return (
                        <div key={`status-${message.id}`} className="hotel-chat-message-status">
                          {message.status === "sent" ? (
                            <>
                              Đã gửi <i className="bi bi-check"></i>
                            </>
                          ) : message.status === "seen" ? (
                            <>
                              Đã xem <i className="bi bi-check-all"></i>
                            </>
                          ) : null}
                        </div>
                      )
                    }
                    return null
                  })}
              </>
            ) : (
              <div className="hotel-chat-empty-state">
                <i className="bi bi-chat-dots"></i>
                <h3>Không có tin nhắn</h3>
                <p>Bắt đầu cuộc trò chuyện với khách hàng bằng cách gửi tin nhắn đầu tiên.</p>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Khu vực nhập tin nhắn */}
          <div className="hotel-chat-input">
            <form onSubmit={sendMessage}>
              <div className="hotel-chat-input-actions">
                <button type="button" title="Đính kèm file">
                  <i className="bi bi-paperclip"></i>
                </button>
                <button type="button" title="Gửi hình ảnh">
                  <i className="bi bi-image"></i>
                </button>
                <button type="button" title="Gửi vị trí">
                  <i className="bi bi-geo-alt"></i>
                </button>
              </div>
              <div className="hotel-chat-input-field">
                <textarea
                  placeholder="Nhập tin nhắn..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  rows="1"
                ></textarea>
              </div>
              <button type="submit" className="hotel-chat-send-button">
                <i className="bi bi-send-fill"></i>
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default Chat

