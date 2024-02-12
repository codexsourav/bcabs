import { Link } from "react-router-dom";
import AdminNavbar from "../../components/admin/AdminNavbar";
import AdminTabWrapper from "../../components/admin/AdminTabWrapper";
import { Table, Tbody, Td, Th, Thead, Tr } from "../../components/admin/MyTabel";
import Button from "../../components/Inputbox/Button";
import { InputBox, InputSelectBox } from "../../components/Inputbox/GoogleInputBoc";
import { adminRoutePath } from "../../routes/AdminRoutes";

function OneWayAdmin() {
    return (
        <>
            <AdminNavbar />
            <AdminTabWrapper>
                <div className="grid grid-cols-5 gap-2 mb-2">
                    <InputBox onChange={(e) => console.log(e)
                    } value={""} placeholder="Find Booking ID" />
                    <InputBox onChange={(e) => console.log(e)
                    } value={""} placeholder="Search By Pickup Address" />
                    <InputSelectBox onChange={(e) => console.log(e)} value="">
                        <option value="" disabled  >Car Type</option>
                    </InputSelectBox>
                    <InputSelectBox onChange={(e) => console.log(e)} value="">
                        <option value="" disabled  >Distance</option>
                    </InputSelectBox>
                    <InputSelectBox onChange={(e) => console.log(e)} value="">
                        <option value="" disabled  >Status</option>
                        <option value="0" disabled  >0%</option>
                        <option value="25" disabled  >25%</option>
                        <option value="50" disabled  >50%</option>
                    </InputSelectBox>
                </div>
                <Table>
                    <Thead>
                        <Tr>
                            <Th>ID</Th>
                            <Th>User Info</Th>
                            <Th>Car Type</Th>
                            <Th>Trip Info</Th>
                            <Th>Pickup Info</Th>
                            <Th>Drop Info</Th>
                            <Th>Action</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        <Tr>
                            <Td>BABA032KB</Td>
                            <Td>
                                <p>Sourav</p>
                                <p>sourav0w@gmail.com</p>
                                <p>+914234243432</p>
                            </Td>
                            <Td>Sadan</Td>
                            <Td>
                                <p className="font-bold text-red-600" >Status: Cancel</p>
                                <p>kolkata to westbengal (1200KM)</p>
                            </Td>
                            <Td>
                                <p>Sourav dfgdfgd fg df gdfgdfgdf,gd,fgdf,gd,fg,dfg,d</p>
                                <p className="mt-1 font-semibold">02/11/2024 at 12:30 PM</p>
                            </Td>
                            <Td>
                                <p>Sourav dfgdfgd fg df gdfgdfgdf,gd,fgdf,gd,fg,dfg,d</p>
                            </Td>
                            <Td>
                                <Link to={adminRoutePath + "/oneway/view/id"}><Button className="font-semibold uppercase">VIEW</Button></Link>
                            </Td>
                        </Tr>
                        <Tr>
                            <Td>BABA032KB</Td>
                            <Td>
                                <p>Sourav</p>
                                <p>sourav0w@gmail.com</p>
                                <p>+914234243432</p>
                            </Td>
                            <Td>Sadan</Td>
                            <Td>
                                <p className="font-bold text-blue-700" >Status: Pending..</p>
                                <p>kolkata to westbengal (1200KM)</p>
                            </Td>
                            <Td>
                                <p>Sourav dfgdfgd fg df gdfgdfgdf,gd,fgdf,gd,fg,dfg,d</p>
                                <p className="mt-1 font-semibold">02/11/2024 at 12:30 PM</p>
                            </Td>
                            <Td>
                                <p>Sourav dfgdfgd fg df gdfgdfgdf,gd,fgdf,gd,fg,dfg,d</p>
                            </Td>
                            <Td>
                                <Button className="font-semibold uppercase">VIEW</Button>
                            </Td>
                        </Tr>
                    </Tbody>
                </Table>
            </AdminTabWrapper>
        </>
    )
}
export default OneWayAdmin;