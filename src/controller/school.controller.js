import { connection } from "../db/db.js";
import { getDistance } from "geolib";

const addSchool = async (req, res) => {
  try {
    const { name, address, latitude, longitude } = req.body;

    if (!name || !address || isNaN(latitude) || isNaN(longitude)) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const result = await connection.query(
      "INSERT INTO schools (name,address,latitude,longitude) VALUES (?,?,?,?)",
      [name, address, latitude, longitude]
    );

    res
      .status(201)
      .json({ success: true, message: "School added successfully" });
    console.log(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const listSchools = async (req, res) => {
  try {
    const { latitude, longitude } = req.query;
    console.log(latitude, longitude);

    if (!latitude || !longitude) {
      return res
        .status(400)
        .json({ success: false, message: "Latitude & Longitude are required" });
    }

    const [schools] = await connection.query("SELECT * FROM schools");

    const userLocation = {
      latitude: Number(latitude),
      longitude: Number(longitude),
    };

    const sortedSchools = schools
      .map((school) => {
        const distanceM = getDistance(userLocation, {
          latitude: Number(school.latitude),
          longitude: Number(school.longitude),
        });
        return {
          ...school,
          distanceMeters: distanceM,
          distanceKm: Number((distanceM / 1000).toFixed(2)),
        };
      })
      .sort((a, b) => a.distanceMeters - b.distanceMeters);

    res.json({ success: true, sortedSchools });
    console.log(sortedSchools);
  } catch (error) {
    console.error("Error fetching schools:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export { addSchool, listSchools };
