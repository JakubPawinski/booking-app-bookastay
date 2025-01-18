import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { io } from 'socket.io-client';
import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';
import axios from 'axios';
import { ENDPOINTS } from '@/config';

import './Chat.scss';

export default function Chat({ onClose, reservationId }) {
	const [socket, setSocket] = useState(null);
	const [messages, setMessages] = useState([]);
	const [message, setMessage] = useState('');
	const [userId, setUserId] = useState(null);

	useEffect(() => {
		const token = Cookies.get('token');
		if (token) {
			const user = jwtDecode(token);
			setUserId(user.id);
		}
	}, []);

	useEffect(() => {
		const newSocket = io('http://localhost:4000', {
			withCredentials: true,
		});
		setSocket(newSocket);

		if (reservationId) {
			newSocket.emit('joinRoom', reservationId);
		}

		return () => {
			if (reservationId) {
				newSocket.emit('leaveRoom', reservationId);
			}
			newSocket.close();
		};
	}, []);
	useEffect(() => {
		console.log('socket:', socket);
		if (!socket) return;

		socket.on('receiveMessage', (message) => {
			setMessages((prev) => [...prev, message]);
		});

		return () => socket.off('receiveMessage');
	}, [socket]);

	useEffect(() => {
		const fetchMessages = async () => {
			try {
				const { data } = await axios.get(
					`${ENDPOINTS.MESSAGES}/${reservationId}`
				);
				setMessages(data);
			} catch (error) {
				console.error('Error fetching messages:', error);
			}
		};
		fetchMessages();
	}, []);

	const sendMessage = (e) => {
		e.preventDefault();
		if (!message.trim() || !socket) return;

		const newMessage = {
			text: message,
			reservationId: reservationId,
			sender: userId,
		};

		socket.emit('sendMessage', newMessage);
		setMessage('');
	};
	return (
		<div className='chat-component'>
			<div className='chat-component-main'>
				<FontAwesomeIcon
					icon={faXmark}
					className='font-awesome-icon'
					onClick={() => onClose()}
				/>

				<div className='chat-header'>
					<h3>Chat</h3>
					<div>
						<p>Reservation ID: {reservationId}</p>
					</div>
				</div>

				<div className='chat-messages'>
					{messages.map((msg, index) => (
						<div
							key={index}
							className={`message ${
								msg.sender === userId ? 'sender' : 'receiver'
							}`}
						>
							{/* <div>
								<p>{msg.sender}: </p> */}
							<p>{msg.text}</p>
							{/* </div> */}
							{/* <span className='timestamp'>
								{new Date(msg.timestamp).toLocaleTimeString()}
							</span> */}
						</div>
					))}
				</div>

				<form onSubmit={sendMessage} className='chat-input'>
					<input
						type='text'
						value={message}
						onChange={(e) => setMessage(e.target.value)}
						placeholder='Type a message...'
					/>
					<button type='submit'>
						<FontAwesomeIcon icon={faPaperPlane} />
					</button>
				</form>
			</div>
		</div>
	);
}
