import contactModel from "../models/ContactModel.js";
import validator from "validator";
export const post = async (req, res) => {
  try {
    if (!req.body.fullName)
      return res.status(400).send({
        success: false,
        code: -1,
        message: "Họ và tên là bắt buộc !",
      });
    if (!req.body.message)
      return res.status(400).send({
        success: false,
        code: -1,
        message: "Lời nhắn là bắt buộc !",
      });
    if (!req.body.email && !req.body.phone) {
      if (req.body.email) {
        if (!validator.isEmail(req.body.email)) {
          return res.status(400).send({
            success: false,
            code: -1,
            message: "Email không hợp lệ !",
          });
        }
      }
      if (req.body.phone) {
        if (!validator.isMobilePhone(req.body.phone)) {
          return res.status(400).send({
            success: false,
            code: -1,
            message: "Số điện thoại không hợp lệ !",
          });
        }
      }
      return res.status(400).send({
        success: false,
        code: -1,
        message: "Thông tin phải có email hoặc số điện thoại !",
      });
    }
    if (req.body.email) {
      if (!validator.isEmail(req.body.email)) {
        return res.status(400).send({
          success: false,
          code: -1,
          message: "Email không hợp lệ !",
        });
      }
    }
    if (req.body.phone) {
      if (
        !validator.isMobilePhone(req.body.phone) ||
        req.body.phone.length <= 8
      ) {
        return res.status(400).send({
          success: false,
          code: -1,
          message: "Số điện thoại không hợp lệ !",
        });
      }
    }
    const contact = new contactModel({
      fullName: req.body.fullName,
      message: req.body.message,
      email: req.body.email,
      phone: req.body.phone,
    });
    await contact
      .save()
      .then((result) => {
        res.status(200).send({
          success: true,
          code: 0,
          message: "Thành công !",
          data: result,
        });
      })
      .catch((error) => {
        res
          .status(500)
          .json({ error: error, message: "Không thành công", success: false });
      });
  } catch (err) {
    res
      .status(500)
      .json({ error: err, message: "Không thành công", success: false });
  }
};

export const get = async (req, res) => {
  try {
    await contactModel
      .find()
      .then((result) => {
        return res.status(200).send({
          success: true,
          code: 0,
          message: "Thành công",
          data: result,
        });
      })
      .catch((error) => {
        return res
          .status(500)
          .send({ error: error, message: "Không thành công", success: false });
      });
  } catch (err) {
    res.status(500).json({ error: true });
  }
};

export const getById = async (req, res) => {
  try {
    await contactModel
      .findById({ _id: req.params.id })
      .then((result) => {
        return res.status(200).send({
          success: true,
          code: 0,
          message: "Thành công",
          data: result,
        });
      })
      .catch((error) => {
        if (error.name === "CastError") {
          return res
            .status(500)
            .send({
              error: error.message,
              message: "Không tìm thấy ID liên kết",
              success: false,
            });
        }
        return res
          .status(500)
          .send({
            error: error.message,
            message: "Không thành công",
            success: false,
          });
      });
  } catch (err) {
    res.status(500).json({ error: true });
  }
};
