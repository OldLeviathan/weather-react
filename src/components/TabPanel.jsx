import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Form from "./Form";
import Weather from "./Weather";
import MyChart from "./MyChart";
import BasicTable from "./BasicTable";

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function BasicTabs(props) {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '75%'}}>
            <Box sx={{ borderBottom: 2, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} >
                    <Tab label="Основная вкладка" {...a11yProps(0)} />
                    <Tab label="Таблица" {...a11yProps(1)} />
                    <Tab label="График" {...a11yProps(2)} />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <Form weatherMethod={props.weatherMethod}/>
                <Weather
                    temp={props.temp}
                    city={props.city}
                    country={props.country}
                    error={props.error}
                />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <BasicTable
                    temp={props.temp}
                    city={props.city}
                    country={props.country}
                />
            </TabPanel>
            <TabPanel value={value} index={2}>
                <MyChart
                    temp={props.temp}
                />
            </TabPanel>
        </Box>
    );
}
