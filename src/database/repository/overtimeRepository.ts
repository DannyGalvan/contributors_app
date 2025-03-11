import { ApiResponse } from '@app-types/ApiResponse';
import { InternalServerError } from '@app-types/Errors';
import { OvertimeResponse } from '@app-types/OvertimeResponse';
import { dataSource } from '@database/dataSource';
import { Overtime } from '@database/models/Overtime';

export const overtimeRepository = dataSource.getRepository(Overtime);

export const createOvertime = async (overtime: Overtime) => {
  const response: ApiResponse<OvertimeResponse> = {
    success: false,
    data: null,
    message: null,
  };

  try {
    await overtimeRepository.save(overtime);

    const overtimeResponse: OvertimeResponse = {
      id: overtime?.id,
      contributorId: overtime.contributorId,
      date: overtime.date,
      startTime: overtime.startTime,
      endTime: overtime.endTime,
      reason: overtime.reason,
      state: overtime.state,
      numberOfHours: 0,
      locationId: overtime.locationId,
      locationName: overtime.locationName,
      createdAt: Date.now().toString(),
      updatedAt: Date.now().toString(),
      createdBy: overtime.contributorId,
      updatedBy: null,
    };

    response.success = true;
    response.data = overtimeResponse;
    response.message = 'Horas extras creadas correctamente';
  } catch (error) {
    response.success = false;
    response.data = null;
    response.message = `Error al guardar el item, ${error}`;
  }

  return response;
};

export const getOvertime = async (id: number) => {
  try {
    return await overtimeRepository.findOne({
      where: { id },
    });
  } catch (error) {
    throw new InternalServerError(`Error al obtener el item, ${error}`);
  }
};

export const getOvertimes = async () => {
  try {
    return await overtimeRepository.find();
  } catch (error) {
    throw new InternalServerError(`Error al obtener los items, ${error}`);
  }
};

export const removeOvertime = async (id: number) => {
  try {
    return await overtimeRepository.delete(id);
  } catch (error) {
    throw new InternalServerError(`Error al remover el item, ${error}`);
  }
};
