import { Component, OnDestroy, OnInit } from '@angular/core';
import {  TarjetaElement } from 'src/app/models/tarjeta';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { TarjetaService } from 'src/app/services/tarjeta.service';
import { RespuestaEmit } from 'src/app/models/respuestaemit.model';




@Component({
	selector: 'app-listar-tarjeta',
	templateUrl: './listar-tarjeta.component.html',
	styleUrls: ['./listar-tarjeta.component.css']

})
export class ListarTarjetaComponent implements OnInit {
	public formRegistroData: TarjetaElement[] = [];
	public pk: number = 0;
	public tipoAccion: number = 1;
	public show: boolean = false;

	constructor(
		private tarjetaService: TarjetaService,
		private toastr: ToastrService
	) {
	}
	ngOnInit(): void {
		this.fetchData();
	}

	nuevo(){
		this.show = true;
	}

	editarEnv(id: number): void {
		// Emit the editar method with the ID
		this.pk = id;
		this.tipoAccion = 0;
		this.show = true;	
	}
	
	eliminar(id: number): void {
		Swal.fire({
			title: 'Confirmar envio',
			text: 'Esta seguro de enviar la informacion?',
			icon: 'question',
			showCancelButton: true,
			confirmButtonText: 'Yes',
			cancelButtonText: 'No',
		}).then((result) => {
			if (result.isConfirmed) {
				this.tarjetaService.deleteTarjeta(id).subscribe(
					() => {
						this.formRegistroData = this.formRegistroData.filter(e => e.id != id)
						//this.fetchdata();
						this.toastr.success('ok', 'tarjeta');
					},
					(error) => {
						this.toastr.error('error', 'tarjeta');
					}
				)
			}
		})
	}

	public fetchData() {
		this.tarjetaService.getTarjetas().subscribe(
			(data) => {
				this.formRegistroData = data;
			},
			(error) => {
				console.error('Error fetching data:', error);
			}
		);
	}

	public retornaEmit(e: RespuestaEmit
		){
		console.log('retorna');
		if (e.estado){
			this.fetchData();
		}
		this.show = false;
		this.tipoAccion = 1;
		this.pk = 0;
	}
}
