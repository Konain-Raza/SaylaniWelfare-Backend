import Beneficiary from "../models/Beneficiary.js";
import QRCode from "qrcode";

const registerBeneficiary = async (req, res) => {
  const { cnic, name, phone, address, purpose, department, status, remarks } =
    req.body;
  try {
    const token = `TOKEN-${Date.now()}`;

    const newBeneficiary = await Beneficiary.create({
      cnic,
      name,
      phone,
      address,
      purpose,
      department,
      status,
      remarks,
      token,
    });
    const qrCodeDataUrl = await QRCode.toDataURL(token);

    res.status(201).json({
      message: "Beneficiary registered successfully",
      beneficiary: newBeneficiary,
      token,
      qrCode: qrCodeDataUrl, // Include the QR code in the response
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error registering beneficiary", error });
  }
};

const getBeneficiaryByToken = async (req, res) => {
  const { token } = req.params;
  try {
    const beneficiary = await Beneficiary.findOne({ token });
    if (!beneficiary) {
      return res.status(404).json({ message: "Beneficiary not found" });
    }
    res.status(200).json({ beneficiary });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching beneficiary", error });
  }
};

const updateBeneficiaryStatus = async (req, res) => {
  const { id, status } = req.body;
  try {
    const updatedBeneficiary = await Beneficiary.findOneAndUpdate(
      { _id: id },
      { status },
      { new: true }
    );
    if (!updatedBeneficiary)
      return res.status(404).json({ message: "user not found" });
    res.json({
      message: "Status updated successfully",
      beneficiary: updatedBeneficiary,
    });
  } catch (error) {
    res.status(500).json({ message: "Error updating status", error });
  }
};

const addRemark = async (req, res) => {
  const { token, remarks } = req.body;
  try {
    const updatedBeneficiary = await Beneficiary.findOneAndUpdate(
      { token },
      {
        remarks,
        $push: {
          history: {
            timestamp: new Date(),
            action: `Remarks added: ${remarks}`,
          },
        },
      },
      { new: true }
    );
    if (!updatedBeneficiary)
      return res.status(404).json({ message: "Token not found" });
    res.json({
      message: "Remarks added successfully",
      beneficiary: updatedBeneficiary,
    });
  } catch (error) {
    res.status(500).json({ message: "Error adding remarks", error });
  }
};

const getAllBeneficiaries = async (req, res) => {
  try {
    const beneficiaries = await Beneficiary.find();
    res.json(beneficiaries);
  } catch (error) {
    res.status(500).json({ message: "Error fetching beneficiaries", error });
  }
};

const deleteBeneficiary = async (req, res) => {
  const { cnic } = req.params;
  try {
    const deletedBeneficiary = await Beneficiary.findOneAndDelete({ cnic });
    if (!deletedBeneficiary)
      return res.status(404).json({ message: "Beneficiary not found" });
    res.json({
      message: "Beneficiary deleted successfully",
      beneficiary: deletedBeneficiary,
    });
  } catch (error) {
    res.status(500).json({ message: "Error deleting beneficiary", error });
  }
};

const updateBeneficiaryInfo = async (req, res) => {
  const { cnic } = req.params;
  const { name, phone, address, purpose, department } = req.body;
  try {
    const updatedBeneficiary = await Beneficiary.findOneAndUpdate(
      { cnic },
      { name, phone, address, purpose, department },
      { new: true }
    );
    if (!updatedBeneficiary)
      return res.status(404).json({ message: "Beneficiary not found" });
    res.json({
      message: "Beneficiary information updated successfully",
      beneficiary: updatedBeneficiary,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating beneficiary information", error });
  }
};

export {
  registerBeneficiary,
  updateBeneficiaryStatus,
  addRemark,
  getAllBeneficiaries,
  deleteBeneficiary,
  updateBeneficiaryInfo,
  getBeneficiaryByToken,
};
