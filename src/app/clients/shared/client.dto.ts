import {ClientAddressDto} from "./clientAddress.dto";
import {CountryDto} from "./country.dto";

export interface ClientDto {
  id: number;
  name: string;
  address: ClientAddressDto;
  applyDate: Date;
  notes: string;
  priority: number;
}
