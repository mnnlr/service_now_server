import { Router } from 'express';
import { 
  IncidentCreate, 
  IncidentUpdate, 
  DeleteIncidents, 
  GetIncidecnts
} from '../controllers/incidentController.js';

const incidentRoutes = Router();

incidentRoutes.route('/')
.post(IncidentCreate)
.get(GetIncidecnts)

incidentRoutes.route('/:id')
  .put(IncidentUpdate)  
  .delete(DeleteIncidents); 

export default incidentRoutes;
