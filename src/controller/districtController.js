const District = require("../model/districtSchema");
const Constituency = require("../model/constituencySchema");
const Assembly = require("../model/assemblySchem");

exports.createDistrict = async (req, res) => {
  const { district } = req.body;

  const districts = new District({ district });

  await districts.save();
  res.status(200).json({
    status: "success",
    message: "District created successfully",
    data: districts,
  });
};

exports.updateDistrict = async (req, res) => {
  const { id } = req.params;
  const { district } = req.body;

  const districts = await District.findByIdAndUpdate(
    id,
    { district },
    { new: true }
  );

  await districts.save();
  res.status(200).json({
    status: "success",
    message: "District updated successfully",
    data: districts,
  });
};

exports.deleteDistrict = async (req, res) => {
  const { id } = req.params;

  const districts = await District.findByIdAndDelete(id);

  res.status(200).json({
    status: "success",
    message: "District deleted successfully",
    data: districts,
  });
};

exports.getDistricts = async (req, res) => {
  const districts = await District.find();
  res.status(200).json({
    status: "success",
    message: "District got successfully",
    data: districts,
  });
};

exports.createconstituency = async (req, res) => {
  const { constituency } = req.body;

  const constituencies = new Constituency({ constituency });

  await constituencies.save();
  res.status(200).json(constituencies);
};

exports.getconstituencys = async (req, res) => {
  const constituencys = await Constituency.find();
  res.status(200).json(constituencys);
};
exports.createassembly = async (req, res) => {
  const { assembly, local } = req.body;

  const assemblys = new Assembly({ assembly, local });

  await assemblys.save();
  res.status(200).status(201).json(assemblys);
};

exports.getassemblys = async (req, res) => {
  const assemblys = await Assembly.find();
  res.status(200).json(assemblys);
};

exports.addConstituenciestoDistrict = async (req, res) => {
  const districtId = req.params.disId;
  const constituencyId = req.params.constId;

  const district = await District.findById(districtId);

  console.log(district);

  district.constituencies.push(constituencyId);

  await district.save();

  res.status(200).json(district);
};

exports.addAssemblytoConstituency = async (req, res) => {
  const constituencyId = req.params.constId;
  const assemblyId = req.params.asId;

  const constituency = await Constituency.findById(constituencyId);

  constituency.assembly.push(assemblyId);

  await constituency.save();

  res.status(200).json(constituency);
};

exports.getConstituencybyDistrict = async (req, res) => {
  const { district } = req.query;

  const districts = await District.findOne({ district: district }).populate({
    path: "constituencies",
    populate: "constituency",
  });
  res.status(200).json(districts.constituencies);
};

exports.getassemblybyDistrict = async (req, res) => {
  const { district, constituency, assembly } = req.query;

  const districties = await District.findOne({ district }).populate({
    path: "constituencies",
    match: { constituency },
  });

  const constituencies = await Constituency.findOne({
    constituency
  }).populate({ path: "assembly", match: { assembly } });
  console.log("hii");
  res.status(200).json({
    status: "success",
    message: "Assembly and constituencies got successfully",
    districties,
    constituencies,
  });
};

