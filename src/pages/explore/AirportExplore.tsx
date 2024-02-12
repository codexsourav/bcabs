import { useEffect, useState } from "react";
import { UserWrapper } from "../../components/wrapper/UserWrapper"
import { IAirportCab } from "../../interface/cabs/cab";
import { useLocation } from "react-router-dom";
import { apiRequest, baseUrl, withErrorHandling } from "../../helper/apiRequest";
import { isAuthLogin, replacePlaceholders, splitArray } from "../../utils/helper";
import { CabExploreWrapper, CabViewWrapper, ExploreWrapper, NoCabsFound, TripInfoWrapper } from "../../components/Cabs/Explore";
import CabBox, { CabInfo, CabService, CabServiceWrapper, FAQWrapper, TripBoxContent, TripBoxWrapper } from "../../components/Cabs/CabBox";
import { IconData } from "../../data/IconData";
import Loader from "../error/Loader";
import { airportType } from "../../components/formTab/tabs/AirportTab";

function AirportExplore() {

    const [loading, setLoading] = useState(true)
    const [data, setData] = useState<{ trip: any, cabs: IAirportCab[] } | null>(null)
    const authResult = new URLSearchParams(window.location.search);
    const location = useLocation();
    const trip = authResult.get("trip");
    const from = authResult.get("airport");
    const to = authResult.get("location");
    const pickupDate = authResult.get("date");
    const pickupTime = authResult.get("time");


    const loadCabs = async () => {
        setData(null)
        const req = await apiRequest<{ trip: any, cabs: IAirportCab[] }>({ "path": "/api/explore/airport", method: "POST", data: { from, to, pickupDate, pickupTime } });
        console.log(req.data);

        setData(req.data);
        setLoading(false);
    }

    const onError = () => {
        setData(null);
        setLoading(false);
    }

    const request = withErrorHandling(loadCabs, onError);

    useEffect(() => {
        setLoading(true);
        request();
    }, [location])


    const navigate = (id: string) => {
        const query = window.location.search;
        if (isAuthLogin()) {
            return `/booking/airport${query}&cabId=${id}`;
        } else {
            return `/login${query}&cabId=${id}`;
        }
    }

    return (
        <UserWrapper>
            {loading ? <div className="flex justify-center items-center h-96 w-full"><Loader /></div> :

                <ExploreWrapper>
                    <TripInfoWrapper >
                        <TripBoxWrapper >
                            <TripBoxContent title="Trip" value={airportType(+trip!)} />
                            <TripBoxContent title="Airport Name" value={from || ""} />
                            <TripBoxContent title="Address" value={to || ""} />
                            <TripBoxContent title="PickupAt" value={`${pickupDate} at ${pickupTime}`} />
                            <TripBoxContent title="Distance" value={data?.trip.totalKM + " KM"} />
                        </TripBoxWrapper>
                    </TripInfoWrapper>
                    <CabExploreWrapper>
                        {data == null || data?.cabs.length == 0 ? <NoCabsFound /> :
                            splitArray<IAirportCab>(data?.cabs!).map((e, i) => {
                                return <CabViewWrapper key={"cab-" + i}>
                                    {
                                        e.map((e, i) => {
                                            return <CabBox
                                                key={"cabno-" + i}

                                                cabInfo={<CabInfo
                                                    totalKM={e.distance + " KM"}
                                                    carImage={baseUrl + "/uploads/" + e.image}
                                                    discount={e.discount.toString()}
                                                    mainPrice={e.price?.toString() + ".00"}
                                                    maxPassenger={e.maxPassengers}
                                                    name={e.cabName}
                                                    price={e.highPrice?.toString() + ".00"}
                                                    bookLink={navigate(e._id!)}
                                                />}

                                                inclusions={
                                                    <CabServiceWrapper>
                                                        {
                                                            e.inclusions.map((d, i) => <CabService
                                                                icon={IconData[d.iconIndex]}
                                                                title={replacePlaceholders(d.title, "**KM**", e.distance + " KM")}
                                                                key={"inclusions-" + i} />)
                                                        }
                                                    </CabServiceWrapper>
                                                }

                                                exclusions={
                                                    <CabServiceWrapper>
                                                        {
                                                            e.exclusions.map((d, i) => <CabService
                                                                icon={IconData[d.iconIndex]}
                                                                title={replacePlaceholders(d.title, "**KM**", e.distance + " KM")}
                                                                key={"exclusions-" + i} />)
                                                        }
                                                    </CabServiceWrapper>
                                                }

                                                facilities={
                                                    <CabServiceWrapper>
                                                        {
                                                            e.facilities.map((d, i) => <CabService
                                                                icon={IconData[d.iconIndex]}
                                                                title={replacePlaceholders(d.title, "**KM**", e.distance + " KM")}
                                                                key={"exclusions-" + i} />)
                                                        }
                                                    </CabServiceWrapper>
                                                }

                                                taq={
                                                    <FAQWrapper>
                                                        {
                                                            e.taq.map((d, i) => <li key={"taq-" + i} className="text-sm">{replacePlaceholders(d, "**KM**", e.distance + " KM")}</li>)
                                                        }
                                                    </FAQWrapper>
                                                }

                                            />
                                        })
                                    }
                                </CabViewWrapper>
                            })
                        }
                    </CabExploreWrapper>
                </ExploreWrapper>
            }
        </UserWrapper>
    )
}
export default AirportExplore