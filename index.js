const express = require("express");
const hall = express();
hall.use(express.json());
// already book rooms and customers in Hall
const myHall = [
    {
      roomName: "ysr",
      seats: 600,
      amenities: "wifi,projection screen,AC",
      price: 2000,
      roomId: "600-xl",
      bookingDetails: [
        {
          customerName: "rafiya",
          date: new Date("2022-11-14"),
          start: "07:00",
          end: "10:00",
          status: "confirmed",
        },
      ],
    },
    {
      roomName: "db",
      seats: 400,
      amenities: "wifi,projection screen,AC",
      price: 1500,
      roomId: "400-l",
      bookingDetails: [
        {
          customerName: "vani",
          date: new Date("2022-11-15"),
          start: "15:00",
          end: "17:00",
          status: "confirmed",
        },
      ],
    },
  ];
   //gett all data
  hall.get("/all", function (req, res) {
    res.json(myHall);
  });
  
  // 1. creating a room 
  hall.post("/createRoom", function (req, res) {
    try {
      myHall.push({
        roomName: req.body.roomname,
        seats: req.body.seats,
        amenities: req.body.amenities,
        price: req.body.price,
        roomId: req.body.roomId,
        bookingDetails: [],
      });
      
      res.status(200).json({
        message: "room created successfully",
      });

    } catch (error) {
      console.log(error);
    }
  });
  
  //2. booking a room 
  hall.post("/bookRoom", (req, res) => {
    for (let i=0; i<myHall.length; i++) {
      if ((myHall[i].roomId !== req.body.roomId)) {
         console.log(myHall[i].roomId)
         
         let booking = {
          "customerName": req.body.customerName,
          "date": new Date(req.body.date),
          "start": req.body.start,
          "end": req.body.end,
          "status": "confirmed"
         }
          myHall[i].bookingDetails.push(booking)
          return res.status(200).send({ message: "Booking Successfully" });
        
    }}
     
      res.status(400).send({ error: "Invaild RoomId" });
  });
  
  // 3.list all rooms with booked data 
  hall.get("/listAllRooms", (req, res) => {
    let customerArray = [];
  
    myHall.forEach((room) => {
      let customerObj = { roomName: room.roomName };
  
      room.bookingDetails.forEach((customer) => {
        customerObj.customerName = customer.customerName;
        customerObj.status = customer.status;
        customerObj.date = customer.date;
        customerObj.start = customer.start;
        customerObj.end = customer.end;
  
        customerArray.push(customerObj);
      });
    });
  
    res.send(customerArray);
  });
  
  //4. list all customers with booked data 
  hall.get("/listAllCustomers", (req, res) => {
    let customerArray = [];
  
    myHall.forEach((room) => {
      let customerObj = { roomName: room.roomName };
  
      room.bookingDetails.forEach((customer) => {
        customerObj.customerName = customer.customerName;
        customerObj.date = customer.date;
        customerObj.start = customer.start;
        customerObj.end = customer.end;
  
        customerArray.push(customerObj);
      });
    });
  
    res.send(customerArray);
  });
  
  
  // Check server or default api (get)

  hall.post("/bookRoom", (req, res) => {
    for (let i=0; i<myHall.length; i++) {
      if ((myHall[i].roomId !== req.body.roomId)) {
         console.log(myHall[i].roomId)
         
         let booking = {
          "customerName": req.body.customerName,
          "date": new Date(req.body.date),
          "start": req.body.start,
          "end": req.body.end,
          "status": "confirmed"
         }
          myHall[i].bookingDetails.push(booking)
          return res.status(200).send({ message: "Booking Successfully" });
        
    }}
     
      res.status(400).send({ error: "Invaild RoomId" });
  });


hall.get("/", (req, res) => res.send(`Server Active`));

hall.listen(process.env.PORT || 3001);