import { useLocation } from "react-router-dom";
import { UserWrapper } from "../../components/wrapper/UserWrapper"
import { useEffect, useState } from "react";
import { ILocalCab } from "../../interface/cabs/cab";
import { apiRequest, baseUrl, withErrorHandling } from "../../helper/apiRequest";
import { applyDiscount, isAuthLogin, replacePlaceholders, splitArray } from "../../utils/helper";
import Loader from "../error/Loader";
import { CabExploreWrapper, CabViewWrapper, ExploreWrapper, NoCabsFound, TripInfoWrapper } from "../../components/Cabs/Explore";
import CabBox, { CabInfo, CabService, CabServiceWrapper, FAQWrapper, LocalTab, TripBoxContent, TripBoxWrapper } from "../../components/Cabs/CabBox";
import { IconData } from "../../data/IconData";

export const LocalHourKey = ["hr4", "kr8", "hr12", "hr24"];
export const LocalHourTitle = [4, 8, 12, 24];


function LocalExplore() {
    const [loading, setLoading] = useState(true)
    const [tab, setTab] = useState(0)
    const [data, setData] = useState<{ trip: any, cabs: ILocalCab[] } | null>(null)
    const authResult = new URLSearchParams(window.location.search);
    const location = useLocation();
    const from = authResult.get("from");
    const pickupDate = authResult.get("date");
    const pickupTime = authResult.get("time");


    const loadCabs = async () => {
        setData(null)
        const req = await apiRequest<{ trip: any, cabs: ILocalCab[] }>({ "path": "/api/explore/local", method: "POST", data: { from, pickupDate, pickupTime } });
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
            return `/booking/local${query}&hr=${LocalHourTitle[tab]}&cabId=${id}`;
        } else {
            return `/login${query}&hr=${LocalHourTitle[tab]}&cabId=${id}`;
        }
    }

    const getPrice = (price: any, index: number) => {
        return price[LocalHourKey[index]]
    }

    return (
        <UserWrapper>
            {loading ? <div className="flex justify-center items-center h-96 w-full"><Loader /></div> :
                <ExploreWrapper>
                    <TripInfoWrapper >
                        <TripBoxWrapper >
                            <TripBoxContent title="Trip" value="Local" />
                            <TripBoxContent title="From" value={from || ""} />
                            <TripBoxContent title="PickupAt" value={`${pickupDate} at ${pickupTime}`} />
                        </TripBoxWrapper>
                    </TripInfoWrapper>
                    <CabExploreWrapper>
                        <div className="w-full col-span-1 lg:col-span-2">
                            <LocalTab tabIndex={tab} setTabindex={(e) => setTab(e)} />
                        </div>
                        {data == null || data?.cabs.length == 0 ? <NoCabsFound /> :
                            splitArray<ILocalCab>(data?.cabs!).map((e, i) => {
                                return <CabViewWrapper key={"cab-" + i}>
                                    {
                                        e.map((e, i) => {
                                            return <CabBox
                                                key={"cabno-" + i}

                                                cabInfo={<CabInfo
                                                    totalKM={LocalHourTitle[tab] + " Hr"}
                                                    carImage={baseUrl + "/uploads/" + e.image}
                                                    discount={e.discount.toString()}
                                                    mainPrice={getPrice(e.prices, tab) + ".00"}
                                                    maxPassenger={e.maxPassengers}
                                                    name={e.cabName}
                                                    price={applyDiscount(getPrice(e.prices, tab), e.discount) + ".00"}
                                                    bookLink={navigate(e._id!)}
                                                />}

                                                inclusions={
                                                    <CabServiceWrapper>
                                                        {
                                                            e.inclusions.map((d, i) => <CabService
                                                                icon={IconData[d.iconIndex]}
                                                                title={replacePlaceholders(d.title, "**KM**", LocalHourTitle[tab] + " Hr")}
                                                                key={"inclusions-" + i} />)
                                                        }
                                                    </CabServiceWrapper>
                                                }

                                                exclusions={
                                                    <CabServiceWrapper>
                                                        {
                                                            e.exclusions.map((d, i) => <CabService
                                                                icon={IconData[d.iconIndex]}
                                                                title={replacePlaceholders(d.title, "**KM**", LocalHourTitle[tab] + " Hr")}
                                                                key={"exclusions-" + i} />)
                                                        }
                                                    </CabServiceWrapper>
                                                }

                                                facilities={
                                                    <CabServiceWrapper>
                                                        {
                                                            e.facilities.map((d, i) => <CabService
                                                                icon={IconData[d.iconIndex]}
                                                                title={replacePlaceholders(d.title, "**KM**", LocalHourTitle[tab] + " Hr")}
                                                                key={"exclusions-" + i} />)
                                                        }
                                                    </CabServiceWrapper>
                                                }

                                                taq={
                                                    <FAQWrapper>
                                                        {
                                                            e.taq.map((d, i) => <li key={"taq-" + i} className="text-sm">{replacePlaceholders(d, "**KM**", LocalHourTitle[tab] + " Hr")}</li>)
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
export default LocalExplore