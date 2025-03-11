import { useAuth } from '@hooks/useAuth';
import { VacationRequest } from '@app-types/VacationRequest';
import { createVacations } from '@services/vacationService';
import { dispatchAlert } from '@utils/converted';
import { updateSearch } from '@observables/searchObservable';

export const useVacations = () => {
  const { idUser, employeeCode, username, startYearToWork } = useAuth();

  const sendForm = async (form: VacationRequest) => {
    form.contributorId = idUser;

    console.log('form', form);

    const response = await createVacations(form);

    if (response.success) {
      dispatchAlert({
        message: 'Solicitud de vacaciones creada correctamente',
        title: 'Operacion Exitosa',
      });

      updateSearch('Periodo', '');
    }

    return response;
  };

  return { employeeCode, username, startYearToWork, sendForm };
};
