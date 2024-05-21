export interface Alarmes {
    id:             number;
    nomAlarme:      string;
    typeAlarmes:    string;
    dateDebut:      string;
    dateFin:        string;
    port:           number;
    alarm_severity: string;
    alarm_cleared:  number;
    sites:          Sites;
    i_L2_end:       number;
    u_L1_end:       number;
    u_L2_end:       number;
    u_L3_end:       number;
    u_L1_start:     number;
    i_DC_start:     number;
    i_DC_end:       number;
    igl1_start:     number;
    i_L3_start:     number;
    i_L1_start:     number;
    u_DC_start:     number;
    i_L2_start:     number;
    i_L1_end:       number;
    u_L3_start:     number;
    i_L3_end:       number;
    u_DC_end:       number;
    u_L2_start:     number;
    igl2_start:     number;
    igl3_end:       number;
    igl3_start:     number;
    igl2_end:       number;
    fuel_start:     number;
    fuel_end:       null;
    igl1_end:       number;
}

export interface Sites {
    id:        number;
    siteName:  string;
    siteClass: string;
    siteId:    string;
    siteType:  string;
    idClient:  string;
    longitude: string;
    latitude:  string;
    genset:    number;
}
