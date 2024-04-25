import { useEffect, useState } from "react";
import axios from "axios";


const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [districts, setDistricts] = useState([]);
  const [constituencies, setConstituencies] = useState([]);
  const [assemblies, setAssemblies] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedConstituency, setSelectedConstituency] = useState("");
  const [selectedAssembly, setSelectedAssembly] = useState("");
  const [selectedLocal, setSelectedLocal] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const getDistricts = async () => {
      try {
        const response = await axios.get(
          "https://dcc-backend-qgm5.onrender.com/api/admin/districtV4"
        );
        setDistricts(response.data);
      } catch (error) {
        setError("Registration failed. Please try again later.");
      }
    };
    getDistricts();
  }, []);

  useEffect(() => {
    const getConstituencies = async () => {
      try {
        if (selectedDistrict) {
          const response = await axios.get(
            `https://dcc-backend-qgm5.onrender.com/api/admin/districtV4?district=${selectedDistrict}`
          );
          setConstituencies(response.data);
        }
      } catch (error) {
        setError("Registration failed. Please try again later.");
      }
    };
    getConstituencies();
  }, [selectedDistrict]);

  useEffect(() => {
    const getAssemblies = async () => {
      try {
        if (selectedDistrict && selectedConstituency) {
          const response = await axios.get(
            `https://dcc-backend-qgm5.onrender.com/api/admin/districtV4?district=${selectedDistrict}&constituency=${selectedConstituency}`
          );
          setAssemblies(response.data);
          console.log(assemblies);
        }
      } catch (error) {
        setError("Registration failed. Please try again later.");
      }
    };
    getAssemblies();
  }, [selectedDistrict, selectedConstituency]);

  const handleDistrictChange = (event) => {
    setSelectedDistrict(event.target.value);
    setSelectedConstituency("");
    setSelectedAssembly("");
  };

  const handleConstituencyChange = (event) => {
    setSelectedConstituency(event.target.value);
    setSelectedAssembly("");
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="p-4 bg-white shadow-md rounded-md">
        <h2 className="text-2xl font-semibold mb-4">Register</h2>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mb-2 p-2 border rounded w-full"
        />
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-2 p-2 border rounded w-full"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-2 p-2 border rounded w-full"
        />
        <div className="flex flex-col gap-4">
          <select
            value={selectedDistrict}
            onChange={handleDistrictChange}
            className="title-type-select"
          >
            {districts.map((district, index) => (
              <option key={index} value={district}>
                {district}
              </option>
            ))}
          </select>

          <select
            value={selectedConstituency}
            onChange={handleConstituencyChange}
            className="title-type-select"
          >
            {constituencies.map((constituency, index) => (
              <option key={index} value={constituency}>
                {constituency}
              </option>
            ))}
          </select>

          <select
            value={selectedAssembly}
            onChange={(e) => setSelectedAssembly(e.target.value)}
            className="title-type-select"
          >
            {assemblies.map((assembly, index) => (
              <option key={index} value={assembly}>
                {assembly}
              </option>
            ))}
          </select>

          <select
            name="local"
            id="local"
            value={selectedLocal}
            onChange={(e) => setSelectedLocal(e.target.value)}
          >
            <option value="panchayath">Panjayath</option>
            <option value="municipality">Municipality</option>
            <option value="corporation">Corporation</option>
          </select>
        </div>

        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-full">
          Register
        </button>
      </div>
    </div>
  );
};

export default RegisterPage;
