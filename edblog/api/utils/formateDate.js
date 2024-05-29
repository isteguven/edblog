export const formatDt= (date,config)=>{

    const defaultOptions = {weekday:"long", day:"numeric", month:"short", year:"numeric", hour:"numeric",minute:"numeric", hour12: false };
    const options=config ? config : defaultOptions;

return new Date(date).toLocaleDateString("tr-TR", options);

}