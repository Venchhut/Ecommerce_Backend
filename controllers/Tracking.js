import TrackingDetail from "../models/TrackingDetail.js";
import Order from "../models/Order.js";

// Create a new tracking detail
export const createTrackingDetail = async (req, res) => {
  try {
    const { OrderId, status } = req.body;

    // Check if OrderId exists in the Order table
    const order = await Order.findByPk(OrderId);
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    const newTrackingDetail = await TrackingDetail.create({ OrderId, status });
    res.status(201).json(newTrackingDetail);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all tracking details
export const getAllTrackingDetails = async (req, res) => {
  try {
    const trackingDetails = await TrackingDetail.findAll();
    res.status(200).json(trackingDetails);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single tracking detail by ID
export const getTrackingDetailById = async (req, res) => {
  try {
    const { id } = req.params;
    const trackingDetail = await TrackingDetail.findByPk(id);

    if (!trackingDetail) {
      return res.status(404).json({ error: "Tracking detail not found" });
    }

    res.status(200).json(trackingDetail);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a tracking detail
export const updateTrackingDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // Find tracking detail by primary key
    const trackingDetail = await TrackingDetail.findByPk(id);

    if (!trackingDetail) {
      return res.status(404).json({ error: "Tracking detail not found" });
    }

    // Ensure status is valid
    const validStatuses = ["Processing", "Shipped", "Delivered", "Cancelled"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: "Invalid status value" });
    }

    // Update the status
    trackingDetail.status = status;
    await trackingDetail.save();

    res.status(200).json(trackingDetail);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a tracking detail
export const deleteTrackingDetail = async (req, res) => {
  try {
    const { id } = req.params;

    const trackingDetail = await TrackingDetail.findByPk(id);

    if (!trackingDetail) {
      return res.status(404).json({ error: "Tracking detail not found" });
    }

    await trackingDetail.destroy();

    res.status(204).json({ message: "Tracking detail deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
