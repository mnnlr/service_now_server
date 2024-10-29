import Counter from "../models/counterModel.js";
import Incident from "../models/incidentModel.js";

const getNextSequence = async (name) => {
    const counter = await Counter.findOneAndUpdate(
      { name }, 
      { $inc: { sequenceValue: 1 } }, // Increment sequence by 1
      { new: true, upsert: true }     // Create if not exists
    );
    return counter.sequenceValue;
  };

const IncidentCreate = async (req, res) => {
    try {
        const {
            title,
            description,
            contactType,
            status,
            priority,
            category,
            subcategory,
            assignmentGroup,
            Configuration_Item,
            service,
            assigneed_to,
            requester,
            resolved_at
        } = req.body;

        const sequenceNumber = await getNextSequence('incident');
        const incidentNumber = `INC${sequenceNumber.toString().padStart(7, '0')}`;

        const newIncident = await Incident.create({
            incidentNumber,
            title,
            description,
            contactType,
            status,
            priority,
            category,
            subcategory,
            assignmentGroup,
            Configuration_Item,
            service,
            assigneed_to,
            requester,
            resolved_at
        });
        return res.status(201).json({
            message: "Incident Create Successsfully",
            success: true, data: newIncident
        });
    } catch (error) {
        return res.status(500).json({ message: error.message, success: false });
    }
};

const IncidentUpdate = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedata = req.body;
        const incident = await Incident.findByIdAndUpdate(id, updatedata, { new: true, runValidators: true })
        if (!incident) {
            return res.status(404).json({
                message: "Incident Not Found"
                , success: false
            })
        }
        return res.status(201).json({
            message: "Incident Update Successfully",
            success: true,
            data: incident
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message,
            success: false
        })
    }
}


const DeleteIncidents = async (req, res) => {
    try {
        const { id } = req.params;
        const incident = await Incident.findByIdAndDelete(id);
        if (!incident) {
            return res.status(404).json({
                message: "Incident Not Found",
                success: false
            })
        }
        return res.status(200).json({
            message: "Incident Delete Successfully",
            success: true
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message,
            success: false
        })
    }
}

const GetIncidecnts = async (req, res) => {
    try {
        const incidents = await Incident.find().populate('assignmentGroup assigneed_to requester');

        return res.status(200).json({
            message: "Incident Fetch Successfully",
            success: true,
            data: incidents
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message,
            success: false
        })
    }
}
export { IncidentCreate, IncidentUpdate, DeleteIncidents, GetIncidecnts }