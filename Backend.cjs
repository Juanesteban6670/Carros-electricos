const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

let cars = [
  { id: '1', modelo: 'Tesla Model 3', disponible: true, asignadoA: null },
  { id: '2', modelo: 'Nissan Leaf', disponible: true, asignadoA: null },
  { id: '3', modelo: 'BMW i3', disponible: true, asignadoA: null }
];

let registros = [];


app.get('/cars', (req, res) => {
  res.json(cars);
});


app.get('/car/:id', (req, res) => {
  const car = cars.find(c => c.id === req.params.id);
  if (!car) return res.status(404).json({ message: 'Carro no encontrado' });

  res.json(car);
});


app.post('/assign', (req, res) => {
  const { carId, empleado, estadoLlantas, estadoChasis, estadoPuertas, observaciones } = req.body;

  const car = cars.find(c => c.id === carId);
  if (!car) return res.status(400).json({ message: 'Carro no encontrado' });

  if (car.disponible) {
    
    car.disponible = false;
    car.asignadoA = empleado;
    registros.push({ carId, empleado, estadoLlantas, estadoChasis, estadoPuertas, observaciones, fecha: new Date(), accion: "Tomado" });
    res.json({ message: `Carro ${car.modelo} asignado a ${empleado}` });
  } else if (car.asignadoA === empleado) {
    
    car.disponible = true;
    car.asignadoA = null;
    registros.push({ carId, empleado, estadoLlantas, estadoChasis, estadoPuertas, observaciones, fecha: new Date(), accion: "Entregado" });
    res.json({ message: `Carro ${car.modelo} devuelto por ${empleado}` });
  } else {
    res.status(400).json({ message: `El carro ya está asignado a ${car.asignadoA}` });
  }
});


app.get('/registros', (req, res) => {
  res.json(registros);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
