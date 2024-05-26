import { TextField, Button, Select, MenuItem, FormControl, InputLabel, FormControlLabel, Checkbox } from "@mui/material";
import { useEffect, useState } from "react";
import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";
import { Role, User } from "../../shared/interfaces/user.interface";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../shared/hook/useAppContext";

interface IFormInput {
    id: number,
    first_name: string;
    last_name: string;
    middle_name?: string;
    date_of_birth: string;
    addresses: {
        country: string;
        city: string;
        street: string;
        type: string;
    }[];
    contact_information: {
        emails: {
            email: string;
            type: string;
            proffered: boolean;
        }[];
        phones: {
            number: string;
            type: string;
            proffered: boolean;
        }[];
    };
    id_document: {
        id: File,
        driver_license: File
    },
    employment_information: {
        name: string;
        from_year: number | string;
        to_year?: number | string;
    }[];
}

type Props = {
    user: User;
    disabled?: boolean;
    showButton?: boolean;
    onChangeEditMode?: (editMode: boolean) => void;
}

const EditUserForm = ({ user, onChangeEditMode, disabled = false, showButton = false }: Props) => {
    const navigate = useNavigate();
    const appContext = useAppContext();
    const { register, handleSubmit, control, formState: { errors }, setValue } = useForm<IFormInput>({
        defaultValues: {
            id: user.id,
            first_name: user.first_name || '',
            middle_name: user.middle_name || '',
            last_name: user.last_name || '',
            date_of_birth: user.date_of_birth || '',
            addresses: user.addresses || [{ country: '', city: '', street: '', type: '' }],
            contact_information: {
                emails: user.contact_information?.emails || [{ email: '', type: '', proffered: false }],
                phones: user.contact_information?.phones || [{ number: '', type: '', proffered: false }]
            },
            id_document: user.id_document,
            employment_information: user.employment_information || [{ name: '', from_year: '', to_year: '' }]
        },
    });

    const { fields: addressFields, append: appendAddress, remove: removeAddress } = useFieldArray({
        control,
        name: "addresses",
    });

    const { fields: emailFields, append: appendEmail, remove: removeEmail } = useFieldArray({
        control,
        name: "contact_information.emails",
    });

    const { fields: phoneFields, append: appendPhone, remove: removePhone } = useFieldArray({
        control,
        name: "contact_information.phones",
    });

    const { fields: employmentFields, append: appendEmployment, remove: removeEmployment } = useFieldArray({
        control,
        name: "employment_information",
    });

    const [isAddrrCollapsed, setIsAddrrCollapsed] = useState(false);
    const [isContactInfoCollapsed, setIsContactInfoCollapsed] = useState(false);
    const [isEmploymentCollapsed, setIsEmploymentCollapsed] = useState(false);

    const enableEditMode = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        if (onChangeEditMode) {
            onChangeEditMode(false)
        }
    }

    const onSubmit: SubmitHandler<IFormInput> = (data) => {
        appContext.updateUser(data)

        if (onChangeEditMode) {
            onChangeEditMode(true)
        }
    }

    // useEffect(() => {
    //     const fields = [
    //         'first_name',
    //         'last_name',
    //         'date_of_birth'
    //     ];

    //     fields.forEach((field: any) => setValue(field, user[field as keyof User]));

    //     // if (user.address) {
    //     //     setValue("addresses", user.address);
    //     // }

    // }, [user, setValue]);

    return (
        <>
            <h3 className="mb-4 text-xl font-semibold dark:text-white">General information</h3>
            <form onSubmit={handleSubmit(onSubmit)}>
                {showButton && (
                    <div className="col-span-6 sm:col-full">

                        {disabled ? (
                            <button
                                className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                onClick={enableEditMode}
                            >Edit</button>
                        ) : (
                            <button
                                className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                type="submit">Save
                            </button>
                        )}
                        {user.role === Role.NORMAL_USER && (
                            <button
                                onClick={() => navigate(`/pages/user/${user.id}/kyc`)}
                                type="button"
                                className="ml-1 text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">KYC
                            </button>
                        )}
                    </div>
                )}
                <div className="hidden">
                    <TextField
                        {...register('id')}
                        type="hidden"
                    />
                </div>
                <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3">
                        <TextField
                            {...register('first_name', { required: true, maxLength: 50 })}
                            label="First Name"
                            margin="normal"
                            fullWidth
                            disabled={disabled}
                            error={!!errors.first_name}
                            helperText={errors.first_name?.message || ''}
                        />
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                        <TextField
                            {...register('middle_name', { maxLength: 50 })}
                            label="Middle Name"
                            margin="normal"
                            fullWidth
                            disabled={disabled}
                            error={!!errors.middle_name}
                            helperText={errors.middle_name?.message || ''}
                        />
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                        <TextField
                            {...register('last_name', { required: true, maxLength: 50 })}
                            label="Last Name"
                            margin="normal"
                            fullWidth
                            disabled={disabled}
                            error={!!errors.last_name}
                            helperText={errors.last_name?.message || ''}
                        />
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                        <TextField
                            {...register('date_of_birth', {
                                required: "Date of birth is required",
                                validate: (value) => {
                                    const selectedDate = new Date(value);
                                    const today = new Date();
                                    return selectedDate < today || "Date of birth must be before today";
                                }
                            })}
                            label="Date of Birth"

                            margin="normal"
                            fullWidth
                            InputLabelProps={{
                                shrink: true,
                            }}
                            disabled={disabled}
                            error={!!errors.date_of_birth}
                            helperText={errors.date_of_birth?.message || ''}
                        />
                    </div>
                    <div className="col-span-6 border border-gray-300 p-4 mb-4 rounded bg-slate-50">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="mb-4 text-xl font-semibold dark:text-white">Address</h3>
                            <button
                                type="button"
                                className="bg-blue-500 text-white px-3 py-1 rounded"
                                onClick={() => setIsAddrrCollapsed(!isAddrrCollapsed)}
                            >
                                {isAddrrCollapsed ? 'Expand' : 'Collapse'}
                            </button>
                        </div>
                        <div className={`${isAddrrCollapsed ? 'hidden' : 'block'}`}>
                            {addressFields.map((field, index) => (
                                <fieldset key={field.id} className={`border border-gray-300 p-4 mb-4 rounded`}>
                                    <legend className="text-sm font-medium text-gray-700 ">Address {index + 1}</legend>
                                    <div className="grid grid-cols-6 gap-6 ">
                                        <div className="col-span-6 sm:col-span-3">
                                            <TextField
                                                {...register(`addresses.${index}.country`, { required: true })}
                                                label="Country"
                                                margin="normal"
                                                fullWidth
                                                disabled={disabled}
                                                error={!!errors.addresses?.[index]?.country}
                                                helperText={errors.addresses?.[index]?.country?.message || ''}
                                            />
                                        </div>
                                        <div className="col-span-6 sm:col-span-3">
                                            <TextField
                                                {...register(`addresses.${index}.city`, { required: true })}
                                                label="City"
                                                margin="normal"
                                                fullWidth
                                                disabled={disabled}
                                                error={!!errors.addresses?.[index]?.city}
                                                helperText={errors.addresses?.[index]?.city?.message || ''}
                                            />
                                        </div>
                                        <div className="col-span-6 sm:col-span-3">
                                            <TextField
                                                {...register(`addresses.${index}.street`, { required: true })}
                                                label="Street"
                                                margin="normal"
                                                fullWidth
                                                disabled={disabled}
                                                error={!!errors.addresses?.[index]?.street}
                                                helperText={errors.addresses?.[index]?.street?.message || ''}
                                            />
                                        </div>
                                        <div className="col-span-6 sm:col-span-3">
                                            <FormControl fullWidth margin="normal" error={!!errors.addresses?.[index]?.type}>
                                                <InputLabel shrink>Type</InputLabel>
                                                <Select
                                                    {...register(`addresses.${index}.type`, { required: true })}
                                                    defaultValue={field.type || ''}
                                                    disabled={disabled}
                                                    label="Type"
                                                >
                                                    <MenuItem value="Work">Work</MenuItem>
                                                    <MenuItem value="Mailing">Mailing</MenuItem>
                                                </Select>
                                                {/* {errors.addresses?.[index]?.type && (
                                            <p className="text-red-500 text-xs">{errors.addresses[index].type?.message}</p>
                                        )} */}
                                            </FormControl>
                                        </div>
                                    </div>
                                    <Button
                                        type="button"
                                        variant="contained"
                                        color="error"
                                        onClick={() => removeAddress(index)}
                                        // className="mt-2 text-white bg-red-500 hover:bg-red-700 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5"
                                        disabled={disabled}
                                    >
                                        Delete
                                    </Button>
                                </fieldset>
                            ))}
                            <Button
                                variant="contained"
                                color="success"
                                type="button"
                                onClick={() => appendAddress({ country: '', city: '', street: '', type: '' })}
                                className="mt-2 text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
                                disabled={disabled}
                            >
                                Add Address
                            </Button>
                        </div>
                    </div>

                    <div className="col-span-6 border border-gray-300 p-4 mb-4 rounded bg-slate-50">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="mb-4 text-xl font-semibold dark:text-white">Contact Information</h3>
                            <button
                                type="button"
                                className="bg-blue-500 text-white px-3 py-1 rounded"
                                onClick={() => setIsContactInfoCollapsed(!isContactInfoCollapsed)}
                            >
                                {isContactInfoCollapsed ? 'Expand' : 'Collapse'}
                            </button>
                        </div>
                        <div className={`${isContactInfoCollapsed ? 'hidden' : 'block'}`}>
                            <div className="col-span-6 border border-gray-300 p-4 mb-4 rounded">
                                <h4 className="mb-4 text-xl font-semibold dark:text-white">Emails</h4>
                                {emailFields.map((field, index) => (
                                    <fieldset key={field.id} className="border border-gray-300 p-4 mb-4 rounded">
                                        <legend className="text-sm font-medium text-gray-700">Email {index + 1}</legend>
                                        <div className="grid grid-cols-6 gap-6">
                                            <div className="col-span-6 sm:col-span-3">
                                                <TextField
                                                    {...register(`contact_information.emails.${index}.email`, { required: true })}
                                                    label="Email"
                                                    margin="normal"
                                                    fullWidth
                                                    disabled={disabled}
                                                    error={!!errors.contact_information?.emails?.[index]?.email}
                                                    helperText={errors.contact_information?.emails?.[index]?.email?.message || ''}
                                                />
                                            </div>
                                            <div className="col-span-6 sm:col-span-3">
                                                <FormControl fullWidth margin="normal" error={!!errors.contact_information?.emails?.[index]?.type}>
                                                    <InputLabel shrink>Type</InputLabel>
                                                    <Select
                                                        {...register(`contact_information.emails.${index}.type`, { required: true })}
                                                        defaultValue={field.type || ''}
                                                        disabled={disabled}
                                                        label="Type"
                                                    >
                                                        <MenuItem value="Work">Work</MenuItem>
                                                        <MenuItem value="Personal">Personal</MenuItem>
                                                    </Select>
                                                </FormControl>
                                            </div>
                                            <div className="col-span-6">
                                                <FormControlLabel
                                                    control={<Checkbox
                                                        {...register(`contact_information.emails.${index}.proffered`)}
                                                        defaultChecked={field.proffered}
                                                        disabled={disabled}
                                                    />}
                                                    label="Preferred"
                                                />
                                            </div>
                                        </div>
                                        <Button
                                            type="button"
                                            variant="contained"
                                            color="error"
                                            onClick={() => removeEmail(index)}
                                            disabled={disabled}
                                        >
                                            Delete
                                        </Button>
                                    </fieldset>
                                ))}
                                <Button
                                    variant="contained"
                                    color="success"
                                    type="button"
                                    onClick={() => appendEmail({ email: '', type: '', proffered: false })}
                                    className="mt-2 text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
                                    disabled={disabled}
                                >
                                    Add Email
                                </Button>
                            </div>

                            <div className="col-span-6 border border-gray-300 p-4 mb-4 rounded">
                                <h4 className="mb-4 text-xl font-semibold dark:text-white">Phones</h4>
                                {phoneFields.map((field, index) => (
                                    <fieldset key={field.id} className="border border-gray-300 p-4 mb-4 rounded">
                                        <legend className="text-sm font-medium text-gray-700">Phone {index + 1}</legend>
                                        <div className="grid grid-cols-6 gap-6">
                                            <div className="col-span-6 sm:col-span-3">
                                                <TextField
                                                    {...register(`contact_information.phones.${index}.number`, { required: true })}
                                                    label="Number"
                                                    margin="normal"
                                                    fullWidth
                                                    disabled={disabled}
                                                    error={!!errors.contact_information?.phones?.[index]?.number}
                                                    helperText={errors.contact_information?.phones?.[index]?.number?.message || ''}
                                                />
                                            </div>
                                            <div className="col-span-6 sm:col-span-3">
                                                <FormControl fullWidth margin="normal" error={!!errors.contact_information?.phones?.[index]?.type}>
                                                    <InputLabel shrink>Type</InputLabel>
                                                    <Select
                                                        {...register(`contact_information.phones.${index}.type`, { required: true })}
                                                        defaultValue={field.type || ''}
                                                        disabled={disabled}
                                                        label="Type"
                                                    >
                                                        <MenuItem value="Work">Work</MenuItem>
                                                        <MenuItem value="Personal">Personal</MenuItem>
                                                    </Select>
                                                </FormControl>
                                            </div>
                                            <div className="col-span-6">
                                                <FormControlLabel
                                                    control={<Checkbox
                                                        {...register(`contact_information.phones.${index}.proffered`)}
                                                        defaultChecked={field.proffered}
                                                        disabled={disabled}
                                                    />}
                                                    label="Preferred"
                                                />
                                            </div>
                                        </div>
                                        <Button
                                            type="button"
                                            variant="contained"
                                            color="error"
                                            onClick={() => removePhone(index)}
                                            disabled={disabled}
                                        >
                                            Delete
                                        </Button>
                                    </fieldset>
                                ))}
                                <Button
                                    variant="contained"
                                    color="success"
                                    type="button"
                                    onClick={() => appendPhone({ number: '', type: '', proffered: false })}
                                    className="mt-2 text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
                                    disabled={disabled}
                                >
                                    Add Phone
                                </Button>
                            </div>
                        </div>

                    </div>

                    <div className="col-span-6 border border-gray-300 p-4 mb-4 rounded">
                        <h3 className="mb-4 text-xl font-semibold dark:text-white">Identification Documents</h3>
                        <fieldset className="col-span-6 border border-gray-300 p-4 mb-4 rounded">
                            <legend className="text-xl font-semibold mb-4 dark:text-white">ID Documents</legend>
                            <div className="grid grid-cols-6 gap-6">
                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="last-name"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">ID Document</label>
                                    <input type="file"
                                        disabled={disabled}
                                        {...register('id_document.id')}
                                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        placeholder="Green" />
                                </div>
                            </div>
                            <div className="grid grid-cols-6 gap-6">
                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="last-name"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Driver's License</label>
                                    <input type="file"
                                        disabled={disabled}
                                        {...register('id_document.driver_license')}
                                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        placeholder="Green" />
                                </div>
                            </div>
                        </fieldset>
                    </div>

                    <div className="col-span-6 border border-gray-300 p-4 mb-4 rounded bg-slate-50">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="mb-4 text-xl font-semibold dark:text-white">Employment Information</h3>
                            <button
                                type="button"
                                className="bg-blue-500 text-white px-3 py-1 rounded"
                                onClick={() => setIsEmploymentCollapsed(!isEmploymentCollapsed)}
                            >
                                {isEmploymentCollapsed ? 'Expand' : 'Collapse'}
                            </button>
                        </div>
                        <div className={`${isEmploymentCollapsed ? 'hidden' : 'block'}`}>
                            {employmentFields.map((field, index) => (
                                <fieldset key={field.id} className="col-span-6 border border-gray-300 p-4 mb-4 rounded">
                                    <div className="grid grid-cols-6 gap-6 mb-4">
                                        <div className="col-span-6 sm:col-span-3">
                                            <TextField
                                                {...register(`employment_information.${index}.name`)}
                                                label="Employer Name"
                                                margin="normal"
                                                fullWidth
                                                disabled={disabled}
                                            />
                                        </div>
                                        <div className="col-span-6 sm:col-span-3">
                                            <TextField
                                                {...register(`employment_information.${index}.from_year`)}
                                                label="From Year"
                                                margin="normal"
                                                fullWidth
                                                disabled={disabled}
                                            />
                                        </div>
                                        <div className="col-span-6 sm:col-span-3">
                                            <TextField
                                                {...register(`employment_information.${index}.to_year`)}
                                                label="To Year"
                                                margin="normal"
                                                fullWidth
                                                disabled={disabled}
                                            />
                                        </div>
                                    </div>
                                    <Button
                                        type="button"
                                        variant="contained"
                                        color="error"
                                        onClick={() => removeEmployment(index)}
                                        // className="mt-2 text-white bg-red-500 hover:bg-red-700 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5"
                                        disabled={disabled}
                                    >
                                        Delete
                                    </Button>
                                </fieldset>
                            ))}
                            <Button
                                variant="contained"
                                color="success"
                                type="button"
                                onClick={() => appendEmployment({ name: '', from_year: '', to_year: '' })}
                                className="mt-2 text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
                                disabled={disabled}
                            >
                                Add Address
                            </Button>
                        </div>

                    </div>

                    {showButton && (
                        <div className="col-span-6 sm:col-full">

                            {disabled ? (
                                <button
                                    className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                    onClick={enableEditMode}
                                >Edit</button>
                            ) : (
                                <button
                                    className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                    type="submit">Save
                                </button>
                            )}
                            {user.role === Role.NORMAL_USER && (
                                <button
                                    onClick={() => navigate(`/pages/user/${user.id}/kyc`)}
                                    type="button"
                                    className="ml-1 text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">KYC
                                </button>
                            )}

                        </div>
                    )}

                </div>
            </form>
        </>

    );
};

export default EditUserForm;
