
export interface Tarjeta {
    tarjetas: TarjetaElement[];
    animals:  Animal[];
}
export interface Animal {
    id:   number;
    name: string;
}

export interface TarjetaElement {
    id? : number;
    titular:     string;
    campo2:      string;
    animal1:     number;
    date:        Date;
    option:      string;
    acceptTerms: boolean;
}

export class Tarjeta{
    
}