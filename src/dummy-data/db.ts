export const conversations = [
	{
		_id: "1",
		admin: "user1",
		groupImage: null,
		groupName: "Group A",
		participants: ["user1", "user2", "user3"],
		_creationTime: 1768515440, // Unix timestamp for 2026-01-15 03:37:20 UTC
		lastMessage: {
			_id: "1",
			messageType: "text",
			content: "Good Morning",
			sender: "user1",
		},
		sender: "user1",
		isOnline: true,
	},
	{
		_id: "2",
		admin: null,
		groupImage: null,
		groupName: null,
		participants: ["user4", "user5"],
		_creationTime: 1768529240, // Unix timestamp for 2026-01-15 07:37:20 UTC
		lastMessage: {
			_id: "2",
			messageType: "text",
			content: "Good Afternoon",
			sender: "user2",
		},
		sender: "user4",
		isOnline: true,
	},
	{
		_id: "3",
		admin: null,
		groupImage: null,
		groupName: null,
		participants: ["user6", "user7"],
		_creationTime: 1768541240, // Unix timestamp for 2026-01-15 12:37:20 UTC
		lastMessage: {
			_id: "3",
			messageType: "image",
			content: "image_url.jpg",
			sender: "user6",
		},
		sender: "user6",
		isOnline: false,
	},
	{
		_id: "4",
		admin: null,
		groupImage:
			"https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/2300px-React-icon.svg.png",
		groupName: null,
		participants: ["user8", "user9", "user10"],
		_creationTime: 1768557440, // Unix timestamp for 2026-01-15 16:37:20 UTC
		lastMessage: {
			_id: "4",
			messageType: "video",
			content: "video_url.mp4",
			sender: "user9",
		},
		sender: "user9",
		isOnline: true,
	},
];

export const messages = [
	{
		_id: "1",
		content: "Good Morning",
		sender: "user1",
		messageType: "text",
	},
	{
		_id: "2",
		content: "Good Afternoon",
		sender: "user2",
		messageType: "text",
	},
	{
		_id: "3",
		content: "Good Evening",
		sender: "user1",
		messageType: "text",
	},
	{
		_id: "4",
		content: "Night Time",
		sender: "user2",
		messageType: "text",
	},
];

export const users = [
	{
		_id: "user1",
		name: "person one",
		email: "personone@email.com",
		image: "/placeholder.png",
		admin: true,
		isOnline: true,
	},
	{
		_id: "user2",
		name: "person two",
		email: "persontwo@email.com",
		image: "/placeholder.png",
		isOnline: true,
	},
	{
		_id: "user3",
		name: "person three",
		email: "personthree@email.com",
		image: "/placeholder.png",
		isOnline: false,
	},
];
