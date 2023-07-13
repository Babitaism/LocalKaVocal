import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import tshirt1 from "../images/tshirt1.jpg"

export default function MultiActionAreaCard() {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={tshirt1}
          alt="T-Shirt"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
          T-Shirt
          </Typography>
          <Typography variant="body2" color="text.secondary">
          Beyond keeping us warm and not naked, clothing boosts confidence and self-image. Now imagine if that feeling was associated with your brand. This isn’t just important for the potential consumer but also for employees, the folks who work with your brand on a daily basis.
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}