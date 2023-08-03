import { format } from 'date-fns'

export const dateFormater = (date) => {
    if(date) {
        return format(new Date(date), 'dd-MM-yyyy | hh:mm')
    }
    return date;
}