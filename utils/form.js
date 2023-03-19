module.exports = {
	startSocket: async (io) => {
		io.on('connection', (socket) => {
			console.log('Someone Logged')

			socket.on('disconnect', () => {
				console.log('User disconnected')
			})
		})
	}
}