import {CountryDto} from "./country.dto";

export interface ClientAddressDto {
  id: number;
  city: string;
  street: string;
  houseNumber: number;
  postalCode: number;
  country: CountryDto;
}
