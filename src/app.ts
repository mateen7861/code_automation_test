import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import axios, { AxiosResponse } from 'axios';

dotenv.config(); 

interface EnvVariables {
    EMAIL: string;
    PASSWORD: string;
  }

  interface LocationResponse {
    lat: number;
    lon: number;
    city: string;
    region: string;
    country: string;
    zip: string;
  }
    

const {EMAIL,PASSWORD}: EnvVariables = process.env as unknown as EnvVariables; // Assert type for environment variables
  

(async function(): Promise<void> {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: EMAIL,
        pass: PASSWORD,
      },
    });

    const response: AxiosResponse<LocationResponse> = await axios.get('http://ip-api.com/json');
    const { lat, lon, city, region, country, zip} = response.data;

    const mailOptions: nodemailer.SendMailOptions = {
      from: EMAIL,
      to: 'mateenworld7861@gmail.com',
      subject: 'Current Location Details ts',
      html: `<h1>Current Location Details</h1>
        <p>Latitude: ${lat}</p>
        <p>Longitude: ${lon}</p>
        <p>City: ${city}</p>
        <p>Region: ${region}</p>
        <p>Country: ${country}</p>
        <p>Zip Code: ${zip}</p>`,
    };

    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully!');
  } catch (error) {
    console.error('Error:', error);
  }
})()
