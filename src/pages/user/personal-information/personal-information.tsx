import { useParams } from "react-router";
import NotFound from "../../common/not-found";
import { useAppContext } from "../../../shared/hook/useAppContext";
import EditUserForm from "../../../components/form/user-form";
import { useState } from "react";

interface IFormInput {
    firstName: string
    lastName: string
    iceCreamType: { label: string; value: string }
}

const PersonalInformation = () => {
    let { id } = useParams();
    let user = useAppContext().getUserById(id)
    let [editMode, setEditMode] = useState(true);

    if (!user) {
        return (<NotFound></NotFound>)
    }

    return (
        <div className="grid grid-cols-1 px-4 pt-6 xl:gap-4 dark:bg-gray-900">
            <div className="mb-4 col-span-full xl:mb-2">
                <nav className="flex mb-5" aria-label="Breadcrumb">
                    <ol className="inline-flex items-center space-x-1 text-sm font-medium md:space-x-2">
                        <li className="inline-flex items-center">
                            <a href="#"
                                className="inline-flex items-center text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-white">
                                <svg className="w-5 h-5 mr-2.5" fill="currentColor" viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
                                </svg>
                                Home
                            </a>
                        </li>
                        <li>
                            <div className="flex items-center">
                                <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd"
                                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                        clipRule="evenodd"></path>
                                </svg>
                                <a href="#"
                                    className="ml-1 text-gray-700 hover:text-primary-600 md:ml-2 dark:text-gray-300 dark:hover:text-white">Users</a>
                            </div>
                        </li>
                        <li>
                            <div className="flex items-center">
                                <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd"
                                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                        clipRule="evenodd"></path>
                                </svg>
                                <span className="ml-1 text-gray-400 md:ml-2 dark:text-gray-500"
                                    aria-current="page">Personal Information</span>
                            </div>
                        </li>
                    </ol>
                </nav>
                <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">Personal Information</h1>
            </div>
            <div
                className="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-700 sm:p-6 dark:bg-gray-800">
                <EditUserForm user={user} onChangeEditMode={setEditMode} disabled={editMode} showButton={true} />
            </div>
            {/* <div
                className="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-700 sm:p-6 dark:bg-gray-800">
                <h3 className="mb-4 text-xl font-semibold dark:text-white">General information</h3>
                <form className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-lg" onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700">First Name</label>
                        <input type="text" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" required />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700">Middle Name</label>
                        <input type="text" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700">Last Name</label>
                        <input type="text" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" required />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700">Date of Birth</label>
                        <input type="date" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" value={dob} onChange={handleDobChange} required />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700">Age</label>
                        <input type="number" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" value={age} disabled />
                    </div>

                    <div className="mb-4">
                        <button type="button" className="px-4 py-2 bg-blue-500 text-white rounded" onClick={addAddress}>Add Address</button>
                    </div>

                    {addresses.map((address, index) => (
                        <div key={index} className="mb-4 p-4 border rounded-md">
                            <div className="mb-2">
                                <label className="block text-gray-700">Country</label>
                                <input type="text" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" required />
                            </div>
                            <div className="mb-2">
                                <label className="block text-gray-700">City</label>
                                <input type="text" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" required />
                            </div>
                            <div className="mb-2">
                                <label className="block text-gray-700">Street</label>
                                <input type="text" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" required />
                            </div>
                            <div className="mb-2">
                                <label className="block text-gray-700">Type</label>
                                <div>
                                    <label className="inline-flex items-center">
                                        <input type="radio" name={`addressType-${index}`} className="form-radio" value="Mailing" defaultChecked />
                                        <span className="ml-2">Mailing</span>
                                    </label>
                                    <label className="inline-flex items-center ml-4">
                                        <input type="radio" name={`addressType-${index}`} className="form-radio" value="Work" />
                                        <span className="ml-2">Work</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    ))}

                    <div className="mb-4">
                        <button type="button" className="px-4 py-2 bg-green-500 text-white rounded" onClick={addContact}>Add Contact Information</button>
                    </div>

                    {contacts.map((contact, index) => (
                        <div key={index} className="mb-4 p-4 border rounded-md">
                            <div className="mb-2">
                                <label className="block text-gray-700">Email</label>
                                <input type="email" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" required />
                            </div>
                            <div className="mb-2">
                                <label className="block text-gray-700">Email Type</label>
                                <div>
                                    <label className="inline-flex items-center">
                                        <input type="radio" name={`emailType-${index}`} className="form-radio" value="Work" defaultChecked />
                                        <span className="ml-2">Work</span>
                                    </label>
                                    <label className="inline-flex items-center ml-4">
                                        <input type="radio" name={`emailType-${index}`} className="form-radio" value="Personal" />
                                        <span className="ml-2">Personal</span>
                                    </label>
                                </div>
                            </div>
                            <div className="mb-2">
                                <label className="block text-gray-700">Phone</label>
                                <input type="text" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" required />
                            </div>
                            <div className="mb-2">
                                <label className="block text-gray-700">Phone Type</label>
                                <div>
                                    <label className="inline-flex items-center">
                                        <input type="radio" name={`phoneType-${index}`} className="form-radio" value="Work" defaultChecked />
                                        <span className="ml-2">Work</span>
                                    </label>
                                    <label className="inline-flex items-center ml-4">
                                        <input type="radio" name={`phoneType-${index}`} className="form-radio" value="Personal" />
                                        <span className="ml-2">Personal</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    ))}

                    <div className="mb-4">
                        <button type="button" className="px-4 py-2 bg-purple-500 text-white rounded" onClick={addDocument}>Add Identification Document</button>
                    </div>

                    {documents.map((document, index) => (
                        <div key={index} className="mb-4 p-4 border rounded-md">
                            <div className="mb-2">
                                <label className="block text-gray-700">ID Document</label>
                                <input type="file" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" required />
                            </div>
                            <div className="mb-2">
                                <label className="block text-gray-700">Driver License</label>
                                <input type="file" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" required />
                            </div>
                        </div>
                    ))}

                    <div className="mb-4">
                        <button type="button" className="px-4 py-2 bg-teal-500 text-white rounded" onClick={addEmployment}>Add Employment Information</button>
                    </div>

                    {employments.map((employment, index) => (
                        <div key={index} className="mb-4 p-4 border rounded-md">
                            <div className="mb-2">
                                <label className="block text-gray-700">Job Title</label>
                                <input type="text" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" required />
                            </div>
                            <div className="mb-2">
                                <label className="block text-gray-700">From Year</label>
                                <input type="number" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" required />
                            </div>
                            <div className="mb-2">
                                <label className="block text-gray-700">To Year</label>
                                <input type="number" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" required />
                            </div>
                        </div>
                    ))}

                    <div className="mb-4">
                        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Submit</button>
                    </div>
                </form>
            </div> */}
        </div>
    )
}

export default PersonalInformation;