"use client"
/* eslint-disable  @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from "react"
import Script from "next/script"

export interface Network {
    id: number
    name: string
    lat: number
    lng: number
}

interface MapboxMapComponentProps {
    networks: Network[]
    mapContainer?: any;
    collapse: boolean;
    closeTask: boolean;
}

export default function MapboxMapComponent({ networks, mapContainer, collapse, closeTask }: MapboxMapComponentProps) {
    console.log('open mapbox component')
    const mapContainer_ = useRef<HTMLDivElement>(mapContainer?.current)
    const [mapLoaded, setMapLoaded] = useState(false)
    const [mapboxLoaded, setMapboxLoaded] = useState(false)
    const [isReset, setIsReset] = useState(true)
    const mapRef = useRef<any>(null)
    const clustersAddedRef = useRef(false)
    const sourceAddedRef = useRef(false)

    useEffect(() => {
        if (!isReset) {
            console.log("---reset : mapboxgl ", (window as any).mapboxgl)
            if ((window as any).mapboxgl) {
                setMapboxLoaded(true)
            } else {
                setIsReset(true)
            }
        } else {
            setTimeout(() => setIsReset(false), 200)
        }
    }, [isReset, mapContainer_.current])

    // Initialize map after Mapbox script is loaded
    useEffect(() => {
        console.log("------ initialize map : ", !mapboxLoaded, !mapContainer_.current, mapRef.current)
        if (!mapboxLoaded || !mapContainer_.current || mapRef.current) return

        //console.log("------ initialize map !!!")
        const mapboxgl = (window as any).mapboxgl
        if (!mapboxgl) return

        // Set access token
        mapboxgl.accessToken = "pk.eyJ1Ijoia2hhbmF0aGlwYmVhbjExIiwiYSI6ImNtZndhdmt4MTAwMWcyanB4enU2eDFqazUifQ.ZxBD0T1LjdR9F_arjCO27g"

        // Initialize map
        const map = new mapboxgl.Map({
            container: mapContainer_.current,
            style: "mapbox://styles/mapbox/outdoors-v12", // Nature-themed style
            center: [100.5018, 13.7563], // Bangkok coordinates [lng, lat]
            zoom: 5,
            minZoom: 3,
            maxZoom: 18,
        })

        // Add navigation controls
        map.addControl(new mapboxgl.NavigationControl(), "top-right")

        // Set map as loaded when it's ready
        map.on("load", () => {
            setMapLoaded(true)
        })

        mapRef.current = map

        return () => {
            // Clean up map on unmount
            //console.log('===== clean up map on unmount !!!')
            if (mapRef.current) {
                mapRef.current.remove()
                mapRef.current = null
                clustersAddedRef.current = false
                sourceAddedRef.current = false
            }
        }
    }, [mapboxLoaded, mapContainer_.current])

    // Add clustering when map and data are ready
    useEffect(() => {
        //console.log("------ add clustering : ", !mapRef.current, !mapLoaded, !mapboxLoaded, networks.length === 0)
        if (!mapRef.current || !mapLoaded || !mapboxLoaded || networks.length === 0) return

        //console.log("------ add clustering !!!!")
        const map = mapRef.current
        const mapboxgl = (window as any).mapboxgl
        if (!mapboxgl) return

        // Function to create a simple circle marker instead of using an image
        const createCircleMarker = () => {
            // Add individual point layer using a circle instead of an image
            map.addLayer({
                id: "unclustered-point",
                type: "circle",
                source: "networks",
                filter: ["!", ["has", "point_count"]],
                paint: {
                    "circle-radius": 8,
                    "circle-color": "#15803d",
                    "circle-stroke-width": 2,
                    "circle-stroke-color": "#ffffff",
                },
            })
        }

        // Function to add or update the GeoJSON source and layers
        const setupClustering = () => {
            const geojsonData = {
                type: "FeatureCollection",
                features: networks.map((network) => ({
                    type: "Feature",
                    properties: {
                        id: network.id,
                        name: network.name,
                    },
                    geometry: {
                        type: "Point",
                        coordinates: [network.lng, network.lat],
                    },
                })),
            }

            // If source already exists, update it
            if (sourceAddedRef.current) {
                if (map.getSource("networks")) {
                    map.getSource("networks").setData(geojsonData)
                }
            } else {
                // Add new source and layers
                map.addSource("networks", {
                    type: "geojson",
                    data: geojsonData,
                    cluster: true,
                    clusterMaxZoom: 14, // Max zoom to cluster points
                    clusterRadius: 50, // Radius of each cluster when clustering points
                })

                // Add cluster layer
                map.addLayer({
                    id: "clusters",
                    type: "circle",
                    source: "networks",
                    filter: ["has", "point_count"],
                    paint: {
                        // Size of the circle based on how many points are in the cluster
                        "circle-radius": [
                            "step",
                            ["get", "point_count"],
                            20, // 20px circle for clusters with < 10 points
                            10,
                            30, // 30px circle for clusters with < 30 points
                            30,
                            40, // 40px circle for clusters with >= 30 points
                        ],
                        // Color of the circle based on how many points are in the cluster
                        "circle-color": [
                            "step",
                            ["get", "point_count"],
                            "#15803d", // Green for small clusters
                            10,
                            "#166534", // Darker green for medium clusters
                            30,
                            "#14532d", // Darkest green for large clusters
                        ],
                        "circle-stroke-width": 2,
                        "circle-stroke-color": "#ffffff",
                        "circle-opacity": 0.9,
                    },
                })

                // Add cluster count layer
                map.addLayer({
                    id: "cluster-count",
                    type: "symbol",
                    source: "networks",
                    filter: ["has", "point_count"],
                    layout: {
                        "text-field": "{point_count_abbreviated}",
                        "text-size": 14,
                        "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
                    },
                    paint: {
                        "text-color": "#ffffff",
                    },
                })

                // Try to use a custom seed marker icon
                try {
                    if (!map.hasImage("seed-marker")) {
                        const seedMarker = new Image(40, 40)
                        seedMarker.crossOrigin = "anonymous"

                        seedMarker.onload = () => {
                            if (!map.hasImage("seed-marker")) {
                                map.addImage("seed-marker", seedMarker)

                                // Add individual point layer with the custom image
                                map.addLayer({
                                    id: "unclustered-point",
                                    type: "symbol",
                                    source: "networks",
                                    filter: ["!", ["has", "point_count"]],
                                    layout: {
                                        "icon-image": "seed-marker",
                                        "icon-size": 0.7,
                                        "icon-allow-overlap": true,
                                    },
                                })
                            }
                        }

                        seedMarker.onerror = () => {
                            console.warn("Failed to load seed marker image, using circle marker instead")
                            createCircleMarker()
                        }

                        seedMarker.src = "/seed-marker.svg"

                        // Set a timeout to check if the layer was added
                        setTimeout(() => {
                            if (!map.getLayer("unclustered-point")) {
                                createCircleMarker()
                            }
                        }, 1000)
                    }
                } catch (error) {
                    console.error("Error loading seed marker:", error)
                    createCircleMarker()
                }

                // Handle click on clusters
                map.on("click", "clusters", (e: any) => {
                    const features = map.queryRenderedFeatures(e.point, { layers: ["clusters"] })
                    const clusterId = features[0].properties.cluster_id
                    map.getSource("networks").getClusterExpansionZoom(clusterId, (err: any, zoom: number) => {
                        if (err) return

                        map.easeTo({
                            center: features[0].geometry.coordinates,
                            zoom: zoom,
                        })
                    })
                })

                // Handle click on individual points
                map.on("click", "unclustered-point", (e: any) => {
                    const coordinates = e.features[0].geometry.coordinates.slice()
                    const { id, name, address, contact, phone, seedTypes, description } = e.features[0].properties

                    // Create popup HTML
                    const popupHTML = `
            <div style="max-width: 300px; padding: 10px;">
              <h3 style="margin: 0 0 8px; color: #15803d; font-weight: bold; font-size: 16px;">${name}</h3>
              <p style="margin: 0 0 5px; font-size: 14px;"><strong>ที่อยู่:</strong> ${address}</p>
              <p style="margin: 0 0 5px; font-size: 14px;"><strong>ติดต่อ:</strong> ${contact}</p>
              <p style="margin: 0 0 5px; font-size: 14px;"><strong>โทร:</strong> ${phone}</p>
              <p style="margin: 0 0 10px; font-size: 14px;"><strong>เมล็ดพันธุ์:</strong> ${seedTypes}</p>
              <a href="/map/${id}" style="color: #15803d; text-decoration: none; font-weight: bold;">ดูข้อมูลเพิ่มเติม</a>
            </div>
          `

                    // Create popup
                    new mapboxgl.Popup({ offset: 25, closeButton: false }).setLngLat(coordinates).setHTML(popupHTML).addTo(map)
                })

                // Change cursor on hover
                map.on("mouseenter", "clusters", () => {
                    map.getCanvas().style.cursor = "pointer"
                })
                map.on("mouseleave", "clusters", () => {
                    map.getCanvas().style.cursor = ""
                })
                map.on("mouseenter", "unclustered-point", () => {
                    map.getCanvas().style.cursor = "pointer"
                })
                map.on("mouseleave", "unclustered-point", () => {
                    map.getCanvas().style.cursor = ""
                })

                sourceAddedRef.current = true
            }
            // Fit map to bounds
            if (networks.length > 0) {
                const bounds = new mapboxgl.LngLatBounds()
                networks.forEach((network) => {
                    bounds.extend([network.lng, network.lat])
                })
                map.fitBounds(bounds, {
                    padding: { top: 50, bottom: 50, left: 50, right: 50 },
                    maxZoom: 12,
                })
            }

            clustersAddedRef.current = true
        }

        // Setup clustering if map is ready
        if (map.loaded()) {
            setupClustering()
        } else {
            map.on("load", setupClustering)
        }

        return () => {
            // Clean up only if the component is unmounting, not on every network change
            if (mapRef.current && !mapRef.current.loaded()) {
                mapRef.current.off("load", setupClustering)
            }
        }
    }, [networks, mapLoaded, mapboxLoaded])

    // resize map ตอน collapse หรือ closeTask เปลี่ยน
    useEffect(() => {
        if (mapRef.current) {
            const timer = setTimeout(() => {
                mapRef.current.resize();
            }, 500); // รอให้ Paper transition เสร็จก่อน
            return () => clearTimeout(timer);
        }
    }, [collapse, closeTask]);


    // resize map ตอนหน้าต่าง browser ถูกย่อ/ขยาย
    useEffect(() => {
        const handleResize = () => {
            if (mapRef.current) {
                mapRef.current.resize();
            }
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <>
            <Script src="https://api.mapbox.com/mapbox-gl-js/v2.15.0/mapbox-gl.js" onLoad={() => setMapboxLoaded(true)} />
            {/* <Script src="./css/mapbox-gl.css" strategy="beforeInteractive" /> */}
            {!mapContainer && <div
                ref={mapContainer_}
                style={{
                    width: "100%",
                    height: "100%",
                    margin: 0,
                    padding: 0,
                    boxSizing: "border-box"
                }}
            />
            }
        </>
    )
}
