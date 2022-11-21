import { PropsInterface } from "../../../../helpers/interfaces";
import {
  FormSelect,
  PrimaryButton,
  FormInput,
} from "../../../reusableComponents";
import { useOpenRequestForm } from "../../../../hooks/useOpenRequestForm";
import { useOpenRequestOptions } from "../../../../hooks/useOpenRequestOptions";
import {
  checkRequiredData,
  createOpenRequest,
  getOpenRequestOptions,
  getUser,
} from "../../../../helpers/helpers";
import { useEffect } from "react";

export const OpenRequestForm: React.FC<PropsInterface> = (): JSX.Element => {
  const user = getUser();
  const [openRequestOptions, setOpenRequestOptions] = useOpenRequestOptions({
    client: [],
    requestTypes: [],
    technicians: [],
  });
  useEffect(() => {
    (async () => {
      const options = await getOpenRequestOptions();
      setOpenRequestOptions(options);
    })();
  }, []);
  const [form, handleChanges] = useOpenRequestForm({
    client: "",
    requestType: "",
    description: "",
    applicant: user !== null ? user : "",
    technician: "",
  });
  const validateClient = checkRequiredData(form.client);
  const validateRequestType = checkRequiredData(form.requestType);
  const validateDescription = checkRequiredData(form.description);
  const validateTechnician = checkRequiredData(form.technician);
  const validateForm =
    validateClient &&
    validateRequestType &&
    validateDescription &&
    validateTechnician;
  const action = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    (async () => {
      const response = await createOpenRequest(
        form.client,
        form.requestType,
        form.description,
        form.applicant,
        form.technician
      );
      if (response.response && response.redirect !== undefined) {
        window.location.replace(response.redirect);
      }
    })();
  };
  return (
    <div className="reusable__form">
      <form className="reusable__form">
        <FormSelect
          label="Cliente"
          name="client"
          value={form.client}
          placeholder="Elija el cliente"
          type="text"
          onChange={handleChanges}
          corners={[true, true, true, true]}
          options={[...openRequestOptions.client]}
        />
        <FormSelect
          label="Tipo de solicitud"
          name="requestType"
          value={form.requestType === undefined ? "" : form.requestType}
          placeholder="Elija el tipo de solicitud"
          type="text"
          onChange={handleChanges}
          corners={[true, true, true, true]}
          options={[...openRequestOptions.requestTypes]}
        />
        <FormInput
          label="Descripción"
          name="description"
          value={form.description === undefined ? "" : form.description}
          placeholder="Ingrese la descripción de la tarea a realizar"
          type="text"
          onChange={handleChanges}
          corners={[true, true, true, true]}
        />
        <FormSelect
          label="Responsable"
          name="technician"
          value={form.technician === undefined ? "" : form.technician}
          placeholder="Elija el responsable de realizar la tarea"
          type="text"
          onChange={handleChanges}
          corners={[true, true, true, true]}
          options={[...openRequestOptions.technicians]}
        />
        <PrimaryButton executeAction={validateForm} action={action}>
          Lanzar evento
        </PrimaryButton>
      </form>
    </div>
  );
};
