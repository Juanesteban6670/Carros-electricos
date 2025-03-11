import React, { useState, useEffect } from "react";
import styled from "styled-components";

// 🎨 Estilos con modo oscuro
const Container = styled.div`
  text-align: center;
  font-family: Arial, sans-serif;
  background-color: #121212;
  color: #ffffff;
  padding: 20px;
  min-height: 100vh;
`;

const VehicleList = styled.ul`
  list-style: none;
  padding: 0;
  max-width: 400px;
  margin: auto;
  background: #1e1e1e;
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(255, 255, 255, 0.1);
`;

const VehicleItem = styled.li`
  padding: 10px;
  border-bottom: 1px solid #444;
  &:last-child {
    border-bottom: none;
  }
`;

const Form = styled.form`
  background: #1e1e1e;
  padding: 20px;
  max-width: 400px;
  margin: auto;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(255, 255, 255, 0.1);
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-weight: bold;
  margin-top: 10px;
  text-align: left;
  color: #bbb;
`;

const Input = styled.input`
  padding: 10px;
  margin-top: 5px;
  background: #252525;
  color: white;
  border: 1px solid #444;
  border-radius: 5px;

  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

const Select = styled.select`
  padding: 10px;
  margin-top: 5px;
  background: #252525;
  color: white;
  border: 1px solid #444;
  border-radius: 5px;

  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

const TextArea = styled.textarea`
  padding: 10px;
  margin-top: 5px;
  background: #252525;
  color: white;
  border: 1px solid #444;
  border-radius: 5px;
  resize: none;

  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

const Button = styled.button`
  margin-top: 15px;
  background-color: #007bff;
  color: white;
  border: none;
  padding: 12px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;

const QRImage = styled.img`
  width: 150px;
  height: 150px;
  margin-top: 10px;
  border-radius: 5px;
  filter: brightness(90%);
`;

const App = () => {
  const [cars, setCars] = useState([]);
  const [carId, setCarId] = useState("");
  const [empleado, setEmpleado] = useState("");
  const [estadoLlantas, setEstadoLlantas] = useState("Correcto");
  const [estadoChasis, setEstadoChasis] = useState("Correcto");
  const [estadoPuertas, setEstadoPuertas] = useState("Correcto");
  const [observaciones, setObservaciones] = useState("");

  useEffect(() => {
    fetch("http://localhost:3000/cars")
      .then((response) => response.json())
      .then((data) => setCars(data))
      .catch((error) => console.error("Error cargando carros:", error));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const registro = {
      carId,
      empleado,
      estadoLlantas,
      estadoChasis,
      estadoPuertas,
      observaciones,
    };

    try {
      const response = await fetch("http://localhost:3000/assign", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(registro),
      });

      const data = await response.json();
      alert(data.message);
    } catch (error) {
      console.error("Error en la asignación:", error);
    }
  };

  return (
    <Container>
      <h1>🚗 Asignación de Carros Eléctricos</h1>

      {/* Lista de Vehículos */}
      <h3>Vehículos Disponibles:</h3>
      <VehicleList>
        {cars.map((car) => (
          <VehicleItem key={car.id}>
            {car.id} - {car.modelo} {car.disponible ? "✅" : "❌"}
          </VehicleItem>
        ))}
      </VehicleList>

      {/* Código QR Estático */}
      <QRImage
        src="https://upload.wikimedia.org/wikipedia/commons/d/d7/Commons_QR_code.png"
        alt="Código QR"
      />
      <p>Escanea el código QR del carro para seleccionarlo</p>

      {/* Formulario de Registro */}
      <Form onSubmit={handleSubmit}>
        <Label>Carro ID:</Label>
        <Input
          type="text"
          value={carId}
          onChange={(e) => setCarId(e.target.value)}
          required
        />

        <Label>Empleado:</Label>
        <Input
          type="text"
          value={empleado}
          onChange={(e) => setEmpleado(e.target.value)}
          required
        />

        <Label>Estado de Llantas:</Label>
        <Select value={estadoLlantas} onChange={(e) => setEstadoLlantas(e.target.value)}>
          <option value="Correcto">Correcto</option>
          <option value="Incorrecto">Incorrecto</option>
        </Select>

        <Label>Estado del Chasis:</Label>
        <Select value={estadoChasis} onChange={(e) => setEstadoChasis(e.target.value)}>
          <option value="Correcto">Correcto</option>
          <option value="Incorrecto">Incorrecto</option>
        </Select>

        <Label>Estado de Puertas:</Label>
        <Select value={estadoPuertas} onChange={(e) => setEstadoPuertas(e.target.value)}>
          <option value="Correcto">Correcto</option>
          <option value="Incorrecto">Incorrecto</option>
        </Select>

        <Label>Observaciones:</Label>
        <TextArea
          value={observaciones}
          onChange={(e) => setObservaciones(e.target.value)}
        />

        <Button type="submit">Registrar</Button>
      </Form>
    </Container>
  );
};

export default App;
