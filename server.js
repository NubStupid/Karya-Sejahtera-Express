const { createServer } = require('http');
const { Server } = require('socket.io');
const next = require('next');
const cors = require("cors");

const dev = true;
const app = next({ dev });
const handle = app.getRequestHandler();

app.use(cors());

app.prepare().then(() => {
  const server = createServer((req, res) => {
    handle(req, res);
  });

  const io = new Server(server, {
    path: '/socket.io',
  });

  // io.on('connection', (socket) => {
  //   console.log('User connected:', socket.id);

  //   // socket.on()

  //   socket.on('message', (msg) => {
  //     console.log('Message received:', msg);
  //     io.emit('message', msg);
  //   });

  //   socket.on('disconnect', () => {
  //     console.log('User disconnected:', socket.id);
  //   });
  // });


  // Namespace khusus untuk admin
  const adminNamespace = io.of('/admin');

  // Menangani koneksi dari user
  io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);

    // Event untuk menerima username dari user
    socket.on('join_room', (username) => {
      // Bergabung ke room dengan nama berdasarkan username
      const userRoom = username;
      socket.join(userRoom);
      // socket.username = username;  // Simpan username di socket untuk referensi

      console.log(`User ${username} joined room: ${userRoom}`);

      // Kirim pesan konfirmasi ke admin tentang user baru
      // adminNamespace.emit('new_user_connected', { username, id: socket.id });
    });
    
    
    socket.on('register_username', (username) => {
      // Bergabung ke room dengan nama berdasarkan username
      const userRoom = username;
      socket.join(userRoom);
      socket.username = username;  // Simpan username di socket untuk referensi

      console.log(`User ${username} joined room: ${userRoom}`);

      // Kirim pesan konfirmasi ke admin tentang user baru
      adminNamespace.emit('new_user_connected', { username, id: socket.id });
    });

    // Event ketika user mengirim pesan ke admin
    socket.on('user_message', (msg) => {
      console.log(`Message from ${socket.username}: ${msg}`);
      
      // Kirim pesan ke admin melalui namespace khusus
      adminNamespace.emit('new_user_message', { username: socket.username, message: msg });
    });

    // Event ketika user disconnect
    socket.on('disconnect', () => {
      console.log(`User disconnected: ${socket.username || socket.id}`);
    });
  });

  // Menangani koneksi admin
  adminNamespace.on('connection', (socket) => {
    console.log(`Admin connected: ${socket.id}`);

    socket.on('admin_connect', ({username}) => {
      // console.log("Admin aktif di chat " + username);
      const userRoom = username, message = 'Admin sudah membaca pesan';
      io.to(userRoom).emit('admin_read', message);
      // io.to(userRoom).emit('admin_reply', message);
    });

    // Admin mengirim pesan ke user tertentu
    socket.on('admin_message', ({ username, message }) => {
      const userRoom = username;

      // console.log("Admin chat ke " + username +  ": " + message);
      
      
      // Kirim pesan dari admin ke room berdasarkan username
      io.to(userRoom).emit('admin_reply', message);
    });

    socket.on('disconnect', () => {
      console.log('Admin disconnected');
    });
  });

  server.listen(3000, () => {
    console.log(`Server ready on http://localhost:3000`);
  });
});