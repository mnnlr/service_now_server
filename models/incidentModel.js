import mongoose from "mongoose";

const incidentSchema = new mongoose.Schema({
  incidentNumber: {
    type: String,
    required: true,
    unique: true
  },
  title: { type: String, required: true },
  description: { type: String },
  contactType: {
    type: String,
    enum: ['None', 'Phone', 'Email', 'web', 'Walk-In', 'Other'],
    default: 'None'
  },
  status: {
    type: String,
    enum: ['open', 'in_progress', 'On_Hold', 'closed', 'canceled'],
    default: 'open'
  },
  priority: {
    type: String,
    enum: ['critical', 'low', 'medium', 'high', 'planning'],
    default: 'low'
  },
  category: {
    type: String,
    enum: ['Software', 'HardWare', 'Network', 'Security', 'Inquery', 'Help', 'None'],
    default: 'None'
  },
  subcategory: {
    type: String,
    enum: ['Email', 'LogIn-Issue', 'Printing', 'Telephony', 'None'],
    default: 'None'
  },
  assignmentGroup: {
    type: mongoose.Schema.Types.ObjectId, ref: 'Group'
  },
  Configuration_Item: {
    type: String,
    enum: ['None', 'servers', 'software lincense', 'network equipment', 'laptop/workstation'],
    default: 'None'
  },
  service: {
    type: String,
    enum: ['SAP_Financial accounting', 'ERP System', 'CMR System', 'Custom Services', 'None'],
    default: "None"
  },
  assigneed_to: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  requester: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  resolved_at: { type: Date },
}, { timestamps: true });

const Incident = mongoose.model('Incident', incidentSchema);
export default Incident;
