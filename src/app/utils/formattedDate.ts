import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export const formatDateUtils = (date: Date) => {
    return format(new Date(date), "dd/MM/yyyy HH:mm:ss", { locale: ptBR });
    // return format(date, 'dd/MM/yyyy', { locale: ptBR });
};