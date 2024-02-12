import { useEffect, useState } from "react";
import { UserWrapper } from "../../components/wrapper/UserWrapper"
import { IRoundTripCab } from "../../interface/cabs/cab";
import { useLocation } from "react-router-dom";
import { apiRequest, baseUrl, withErrorHandling } from "../../helper/apiRequest";
import { isAuthLogin, replacePlaceholders, splitArray } from "../../utils/helper";
import Loader from "../error/Loader";
import { CabExploreWrapper, CabViewWrapper, ExploreWrapper, NoCabsFound, TripInfoWrapper } from "../../components/Cabs/Explore";
import CabBox, { CabInfo, CabService, CabServiceWrapper, FAQWrapper, TripBoxContent, TripBoxWrapper } from "../../components/Cabs/CabBox";
import { IconData } from "../../data/IconData";

function RoundTripExplore() {

    const [loading, setLoading] = useState(true)
    const [data, setData] = useState<{ trip: any, cabs: IRoundTripCab[] } | null>(null)
    const authResult = new URLSearchParams(window.location.search);
    const location = useLocation();
    const from = authResult.get("from");
    const to = authResult.get("to");
    const pickupDate = authResult.get("date");
    const dropDate = authResult.get("return");

    const pickupTime = authResult.get("time");
    const toArray = to?.split("||");

    const loadCabs = async () => {
        setData(null)
        const req = await apiRequest<{ trip: any, cabs: IRoundTripCab[] }>({ "path": "/api/explore/roundtrip", method: "POST", data: { from, to: toArray, pickupDate, pickupTime, dropDate } });
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
            return `/booking/roundtrip${query}&cabId=${id}`;
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
                            <TripBoxContent title="Trip" value="One Way" />
                            <TripBoxContent title="From" value={from || ""} />
                            <TripBoxContent title="To" value={toArray?.join(' > ') || ""} />
                            <TripBoxContent title="PickupAt" value={`${pickupDate} at ${pickupTime}`} />
                            <TripBoxContent title="ReturnAt" value={`${dropDate}`} />
                            <TripBoxContent title="Distance" value={data?.trip.totalKM + " KM"} />
                            <TripBoxContent title="Duration" value={data?.trip.tripTime.days + " Days"} />
                        </TripBoxWrapper>
                    </TripInfoWrapper>
                    <CabExploreWrapper>
                        {data == null || data?.cabs.length == 0 ? <NoCabsFound /> :
                            splitArray<IRoundTripCab>(data?.cabs!).map((e, i) => {
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
export default RoundTripExplore