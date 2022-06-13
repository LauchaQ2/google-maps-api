import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  Heading,
  SkeletonText,
  styled,
  Text,
} from '@chakra-ui/react'
import { FaLocationArrow, FaTimes } from 'react-icons/fa'

import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  Autocomplete,
  InfoWindow,
  DirectionsRenderer,
} from '@react-google-maps/api'
import { useRef, useState } from 'react'
import iconPlumber from './assets/water-tap.png'
import './App.css'

const center = { lat: -34.620822587814146, lng: -58.4093147 }

const libraries = ['places']


const image = iconPlumber;


function App() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: 'AIzaSyA_bDJSRoGxiBJ3IFTFEGgM98gDR9lOtIQ',
    libraries
  })

  const data = [
    {
      lat: -34.61442369056862,
      lng: -58.40927178465856,
      name: "Plomero 1",
      phone: "123456"
    }
    ,
    {
      lat: -34.61441369056862,
      lng: -58.40120256217304,
      name: "Plomero 2",
      phone: "983457876"
    }
    ,
    {
      lat: -34.61745107317514,
      lng: -58.414162995240034,
      name: "Plomero 3",
      phone: "16547564"
    }
    ,
    {
      lat: -34.630553093920675,
      lng: -58.418642824671906,
      name: "Plomero 4",
      phone: "34234234"
    }
    ,
    {
      lat: -34.622288202192664,
      lng: -58.401654311026846,
      name: "Plomero 5",
      phone: "246337888"
    }
  ]
  const [map, setMap] = useState(/** @type google.maps.Map */(null))
  const [directionsResponse, setDirectionsResponse] = useState(null)
  const [distance, setDistance] = useState('')
  const [duration, setDuration] = useState('')
  const [placeSelected, setPlaceSelected] = useState("");

  /** @type React.MutableRefObject<HTMLInputElement> */
  const originRef = useRef()
  /** @type React.MutableRefObject<HTMLInputElement> */
  const destiantionRef = useRef()

  if (!isLoaded) {
    return <SkeletonText />
  }

  async function calculateRoute() {
    if (originRef.current.value === '' || destiantionRef.current.value === '') {
      return
    }
    // eslint-disable-next-line no-undef
    const directionsService = new google.maps.DirectionsService()
    const results = await directionsService.route({
      origin: originRef.current.value,
      destination: destiantionRef.current.value,
      // eslint-disable-next-line no-undef
      travelMode: google.maps.TravelMode.DRIVING,
    })
    setDirectionsResponse(results)
    setDistance(results.routes[0].legs[0].distance.text)
    setDuration(results.routes[0].legs[0].duration.text)

  }

  function clearRoute() {
    setDirectionsResponse(null)
    setDistance('')
    setDuration('')
    originRef.current.value = ''
    destiantionRef.current.value = ''
  }

  console.log(data)



  return (
    <Flex
      position='relative'
      flexDirection='column'
      alignItems='center'
      h='100vh'
      w='100vw'
    >
      <Box position='absolute' left={0} top={0} h='100%' w='100%'>
        {/* Google Map Box */}
        <GoogleMap
          center={center}
          zoom={15}
          mapContainerStyle={{ width: '100%', height: '100%' }}
          options={{
            zoomControl: false,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
            gestureHandling: "greedy"
          }}
          onLoad={map => setMap(map)}
        >
          <Marker position={center} />
          {
            data.map(place => {
              return (
                <><Marker onClick={() => { setPlaceSelected(place) }} title={place.name} icon={image} position={place} />
                  
                  </>
                  
              )
            }
            )
          }
          {placeSelected !== null &&
                  <InfoWindow onCloseClick={()=>setPlaceSelected(null)} position={placeSelected}>
                    <div>
                      <h1>Nombre: {placeSelected.name}</h1>
                      <h3>Teléfono: {placeSelected.phone}</h3>
                    </div>
                  </InfoWindow>
                  }
          {directionsResponse && (
            <DirectionsRenderer directions={directionsResponse} />
          )}
        </GoogleMap>
      </Box>
      <Box
        p={4}
        borderRadius='lg'
        m={4}
        bgColor='white'
        shadow='base'
        zIndex='1'
      >
        <Heading>Plomeros de CABA</Heading>
      </Box>
    </Flex>
  )
}

export default App


/*<Marker position={data.place1} title='Plomero' icon={image} />
          <Marker position={data.place2} title='Plomero' icon={image} />
          <Marker position={data.place3} title='Plomero' icon={image} />
          <Marker position={data.place4} title='Plomero' icon={image} />*/