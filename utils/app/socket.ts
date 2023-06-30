import { io , Socket} from "socket.io-client";

let socket: Socket;

interface SocketMessageSent {
	msg: string,
	chat_id: string
}

export interface SocketMessageReceived {
	question: string,
	answer: string
}

export const initSocket = () => {
	// TODO: specify io(server domain)
	// socket = io('http://localhost:8000', { transports : ['websocket'] });
	socket = io('http://localhost:8000');

	socket.io.on('open', () => {
		console.log('client ready');
	})

}

export const sendMessage = (msg: string, chat_id: string) => {
	// console.log('sending to server', msg, chat_id)
	socket.emit("chat:msg", { msg, chat_id });
}


export const onIncomingMessage = (handler: (response: SocketMessageReceived) => void) => {
	socket.on('chat:resp', (response) => {
		console.log('message received on client', response);
		handler(response)
		// setTimeout(() => handler(response), 2000)
	});

	return () => socket.off('chat:resp', handler);
}