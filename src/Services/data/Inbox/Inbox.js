export const Users = [
  {
    id: 1,
    name: "Jane Doe",
    avatar: "https://i.pravatar.cc/150?img=1",
    lastMessage: "Hey! How are you?",
    messages: [
      {
        id: 1,
        text: "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content.!",
        sender: "Jane",
        timestamp: "10:00 AM",
      },
      { id: 2, text: "How are you?", sender: "Jane", timestamp: "10:01 AM" },
    ],
  },
  {
    id: 2,
    name: "John Smith",
    avatar: "https://i.pravatar.cc/150?img=2",
    lastMessage: "Let's catch up later!",
    messages: [
      {
        id: 1,
        text: "How are you?",
        sender: "John",
        timestamp: "10:02 AM",
      },
    ],
  },
];