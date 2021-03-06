import { Component, OnInit } from '@angular/core';
import { AppointmentService} from '../../services/appointment.service';
import { AuthenticateService} from '../../services/authenticate.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Appointment} from '../../class/appointment';

@Component({
  selector: 'app-appointment-details',
  templateUrl: './appointment-details.component.html',
  styleUrls: ['./appointment-details.component.css']
})
export class AppointmentDetailsComponent implements OnInit {

  constructor(
    private appointmentService: AppointmentService,
    public authService: AuthenticateService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  appt_id = this.activatedRoute.snapshot.paramMap.get('appt_id');
  user_id = this.authService.getLoggedUserID();

  appointment: Appointment;
  showMainButtons = true;
  show_editForm = false;
  appt_not_found = false;

  show_alert = false;
  show_error = false;
  show_delete = false;
  err_text = "";

  resetShowError(){
    this.show_error = false;
    this.show_alert = false;
    this.appt_not_found = false;
  }

  toggleEditForm(){
    this.show_delete = false;
    this.show_editForm = !this.show_editForm;
    this.showMainButtons = !this.showMainButtons
    this.getAppointment();
  }

  toggleDelete(){
    this.show_editForm = false;
    this.show_delete = !this.show_delete;
    this.showMainButtons = !this.showMainButtons
  }

  editAppt(editForm: any){
    if (!editForm.appt_title || !editForm.appt_with_person || !editForm.appt_date || !editForm.appt_notes){
      this.show_error = true;
      this.err_text = "Please fill all values";
      this.getAppointment();
      return ;
    }

    this.appointmentService.editApptByIdOfLoggedUser(this.user_id, this.appt_id, this.appointment)
    .then( (data) => {
      this.appointment = data;
      this.show_editForm = false;
    })
    .catch(err => {
      console.log(err);
    });
  }

  getAppointment(){
    this.appointmentService.getApptByIdOfLoggedUser(this.user_id, this.appt_id)
    .then( (data) => {
      this.appointment = data;
    })
    .catch(err => {
      this.show_error = true;
      this.err_text = "Something went down! Are you sure you provided the correct URL?";
      this.appt_not_found = true;
    });
  }

  deleteAppt(){
    this.appointmentService.deleteAppByIdofLoggedUser(this.user_id, this.appt_id)
    .then( () => {
      this.router.navigate(['/appointments']);
    })
    .catch(err =>{
      console.log(err);
    })
  }

  ngOnInit() {
    this.getAppointment();
  }

}
