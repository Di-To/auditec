import dataSet from "../../../MockData"

export default function handler(req, res) {
    res.status(200).json({ dataSet })
  }