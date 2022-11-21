import { APIPaths, PropsInterface } from "../../../helpers/interfaces";
import { PrimaryButton, FormInput } from "../../reusableComponents";
import { useTeamForm } from "../../../hooks/useTeamForm";
import { checkDates, getReport } from "../../../helpers/helpers";

export const ReportForm: React.FC<PropsInterface> = (): JSX.Element => {
  const [form, setForm, handleChanges] = useTeamForm({
    startdate: "",
    enddate: "",
  });
  const validateForm = checkDates(form.startdate, form.enddate);
  const action = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    (async () => {
      const response = await getReport(form.startdate, form.enddate);
      if (response.response && response.redirect !== undefined) {
        setForm({
          startdate: "",
          enddate: "",
        });
        const url = document.createElement("a");
        url.download = "hawksbill.xlsx";
        url.href = `${APIPaths.MEDIA_URL}/${response.redirect}`;
        url.click();
      }
    })();
  };
  return (
    <div className="reusable__form">
      <form className="reusable__form">
        <FormInput
          label="Fecha de inicio"
          name="startdate"
          value={form.startdate}
          placeholder="Ingrese la fecha de inicio"
          type="date"
          onChange={handleChanges}
          corners={[true, true, true, true]}
        />
        <FormInput
          label="Fecha de cierre"
          name="enddate"
          value={form.enddate}
          placeholder="Ingrese la fecha de cierre"
          type="date"
          onChange={handleChanges}
          corners={[true, true, true, true]}
        />
        <PrimaryButton executeAction={validateForm} action={action}>
          Generar informe
        </PrimaryButton>
      </form>
    </div>
  );
};
