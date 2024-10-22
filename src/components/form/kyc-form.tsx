import { TextField, Button, Select, MenuItem, FormControl, InputLabel, FormControlLabel, Checkbox, FormLabel, Radio, RadioGroup } from "@mui/material";
import { MouseEventHandler, useEffect, useMemo, useState } from "react";
import { useForm, SubmitHandler, useFieldArray, Controller, useWatch } from "react-hook-form";
import { User } from "../../shared/interfaces/user.interface";
import { useNavigate } from "react-router-dom";
import { AssetType, Experience, IncomeType, LiabilityType, Review, RiskTolerance, SourceOfType } from "../../shared/interfaces/review.interface";
import { useAppContext } from "../../shared/hook/useAppContext";

interface IFormInput {
    incomes: {
        type: string,
        amount: number
    }[];
    assets: {
        type: string,
        amount: number
    }[];
    liabilities: {
        type: string,
        amount: number
    }[];
    source_of_funds: {
        type: string,
        amount: number
    }[],
    experience: Experience;
    risk_tolerance: RiskTolerance;
    net_worth: number;
}

type Props = {
    review?: Review;
    user: User;
    disabled?: boolean;
}


const KYCForm = ({ user, review, disabled = false }: Props) => {
    const navigate = useNavigate();
    const appContext = useAppContext();

    const { register, handleSubmit, control, formState: { errors }, setValue, watch } = useForm<IFormInput>({
        defaultValues: {
            incomes: review?.financial_status.incomes || [{ type: IncomeType.Salary, amount: 0 }],
            assets: review?.financial_status.assets || [{ type: AssetType.Bond, amount: 0 }],
            liabilities: review?.financial_status.liabilities ||  [{ type: LiabilityType.PersonalLoan, amount: 0 }],
            source_of_funds: review?.financial_status.source_of_funds || [{ type: SourceOfType.Inheritance, amount: 0 }],
            experience: review?.financial_status.experience || Experience.LessThan5Years,
            risk_tolerance: review?.financial_status.risk_tolerance || RiskTolerance.TenPercent,
            net_worth: review?.financial_status.net_worth || 0,
        },
    });

    const { fields: incomeFields, append: appendIncome, remove: removeIncome } = useFieldArray({
        control,
        name: "incomes",
    });

    const { fields: assetFields, append: appendAsset, remove: removeAsset } = useFieldArray({
        control,
        name: "assets",
    });

    const { fields: liabilityFields, append: appendLiability, remove: removeLiability } = useFieldArray({
        control,
        name: "liabilities",
    });

    const { fields: sourceOfFundFields, append: appendSourceOfFund, remove: removeSourceOfFund } = useFieldArray({
        control,
        name: "source_of_funds",
    });


    const [isIncomeCollapsed, setIsIncomeCollapsed] = useState(false);
    const [isAssetCollapsed, setIsAssetCollapsed] = useState(false);
    const [isLiablilityCollapsed, setIsLiablilityCollapsed] = useState(false);
    const [isSourceOfFundCollapsed, setIsSourceOfFundCollapsed] = useState(false);

    const onSubmit: SubmitHandler<IFormInput> = (data) => {

        appContext.createReview({
            userId: user.id,
            financial_status: data
        })
        navigate(`/pages/review/pending-review`)
    }

    const incomes = useWatch({ control, name: "incomes" });
    const assets = useWatch({ control, name: "assets" });
    const liabilities = useWatch({ control, name: "liabilities" });
    const source_of_funds = useWatch({ control, name: "source_of_funds" });

    useMemo(() => {

        const totalIncome = incomes.reduce((acc, curr) => acc + Number(curr.amount), 0);
        const totalAssets = assets.reduce((acc, curr) => acc + Number(curr.amount), 0);
        const totalLiabilities = liabilities.reduce((acc, curr) => acc + Number(curr.amount), 0);
        const totalFunds = source_of_funds.reduce((acc, curr) => acc + Number(curr.amount), 0);

        const netWorth = totalIncome + totalAssets + totalFunds + totalLiabilities;
        setValue("net_worth", netWorth);
        // const fields = [
        //     'first_name',
        //     'last_name',
        //     'date_of_birth'
        // ];

        // fields.forEach((field: any) => setValue(field, user[field as keyof User]));

        // if (user.address) {
        //     setValue("addresses", user.address);
        // }
    }, [incomes, assets, liabilities, source_of_funds, setValue]);


    return (
        <>
            <h3 className="mb-4 text-xl font-semibold dark:text-white">Finance Status</h3>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 border border-gray-300 p-4 mb-4 rounded bg-slate-50">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="mb-4 text-xl font-semibold dark:text-white">Incomes</h3>
                            <button
                                type="button"
                                className="bg-blue-500 text-white px-3 py-1 rounded"
                                onClick={() => setIsIncomeCollapsed(!isIncomeCollapsed)}
                            >
                                {isIncomeCollapsed ? 'Expand' : 'Collapse'}
                            </button>
                        </div>
                        <div className={`${isIncomeCollapsed ? 'hidden' : 'block'}`}>
                            {incomeFields.map((field, index) => (
                                <fieldset key={field.id} className={`border border-gray-300 p-4 mb-4 rounded`}>
                                    <legend className="text-sm font-medium text-gray-700 ">Income {index + 1}</legend>
                                    <div className="grid grid-cols-6 gap-6 ">
                                        <div className="col-span-6 sm:col-span-3">
                                            <FormControl fullWidth margin="normal" error={!!errors.incomes?.[index]?.type}>
                                                <InputLabel shrink>Type</InputLabel>
                                                <Select
                                                    {...register(`incomes.${index}.type`, { required: true })}
                                                    defaultValue={field.type || ''}
                                                    disabled={disabled}
                                                    label="Type"
                                                >
                                                    <MenuItem value="Salary">Salary</MenuItem>
                                                    <MenuItem value="Investment">Investment</MenuItem>
                                                    <MenuItem value="Other">Other</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </div>
                                    </div>
                                    <div className="col-span-6 sm:col-span-3">
                                        <TextField
                                            {...register(`incomes.${index}.amount`, { required: true })}
                                            type="number"
                                            label="Amount"
                                            margin="normal"
                                            fullWidth
                                            disabled={disabled}
                                            error={!!errors.incomes?.[index]?.amount}
                                            helperText={errors.incomes?.[index]?.amount?.message || ''}
                                        />
                                    </div>
                                    <Button
                                        type="button"
                                        variant="contained"
                                        color="error"
                                        onClick={() => removeIncome(index)}
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
                                onClick={() => appendIncome({ type: IncomeType.Salary, amount: 0 })}
                                className="mt-2 text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
                                disabled={disabled}
                            >
                                Add Income
                            </Button>
                        </div>


                    </div>

                    <div className="col-span-6 border border-gray-300 p-4 mb-4 rounded bg-slate-50">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="mb-4 text-xl font-semibold dark:text-white">Assets</h3>
                            <button
                                type="button"
                                className="bg-blue-500 text-white px-3 py-1 rounded"
                                onClick={() => setIsAssetCollapsed(!isAssetCollapsed)}
                            >
                                {isAssetCollapsed ? 'Expand' : 'Collapse'}
                            </button>
                        </div>
                        <div className={`${isAssetCollapsed ? 'hidden' : 'block'}`}>
                            {assetFields.map((field, index) => (
                                <fieldset key={field.id} className={`border border-gray-300 p-4 mb-4 rounded`}>
                                    <legend className="text-sm font-medium text-gray-700 ">Asset {index + 1}</legend>
                                    <div className="grid grid-cols-6 gap-6 ">
                                        <div className="col-span-6 sm:col-span-3">
                                            <FormControl fullWidth margin="normal" error={!!errors.assets?.[index]?.type}>
                                                <InputLabel shrink>Type</InputLabel>
                                                <Select
                                                    {...register(`assets.${index}.type`, { required: true })}
                                                    defaultValue={field.type || ''}
                                                    disabled={disabled}
                                                    label="Type"
                                                >
                                                    <MenuItem value="Bond">Bond</MenuItem>
                                                    <MenuItem value="Liquidity">Liquidity</MenuItem>
                                                    <MenuItem value="Real Estate">Real Estate</MenuItem>
                                                    <MenuItem value="Others">Others</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </div>
                                    </div>
                                    <div className="col-span-6 sm:col-span-3">
                                        <TextField
                                            {...register(`assets.${index}.amount`, { required: true })}
                                            type="number"
                                            label="Amount"
                                            margin="normal"
                                            fullWidth
                                            disabled={disabled}
                                            error={!!errors.assets?.[index]?.amount}
                                            helperText={errors.assets?.[index]?.amount?.message || ''}
                                        />
                                    </div>
                                    <Button
                                        type="button"
                                        variant="contained"
                                        color="error"
                                        onClick={() => removeAsset(index)}
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
                                onClick={() => appendAsset({ type: AssetType.Bond, amount: 0 })}
                                className="mt-2 text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
                                disabled={disabled}
                            >
                                Add Asset
                            </Button>
                        </div>


                    </div>

                    <div className="col-span-6 border border-gray-300 p-4 mb-4 rounded bg-slate-50">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="mb-4 text-xl font-semibold dark:text-white">Liabilities</h3>
                            <button
                                type="button"
                                className="bg-blue-500 text-white px-3 py-1 rounded"
                                onClick={() => setIsLiablilityCollapsed(!isLiablilityCollapsed)}
                            >
                                {isLiablilityCollapsed ? 'Expand' : 'Collapse'}
                            </button>
                        </div>
                        <div className={`${isLiablilityCollapsed ? 'hidden' : 'block'}`}>
                            {liabilityFields.map((field, index) => (
                                <fieldset key={field.id} className={`border border-gray-300 p-4 mb-4 rounded`}>
                                    <legend className="text-sm font-medium text-gray-700 ">Liability {index + 1}</legend>
                                    <div className="grid grid-cols-6 gap-6 ">
                                        <div className="col-span-6 sm:col-span-3">
                                            <FormControl fullWidth margin="normal" error={!!errors.liabilities?.[index]?.type}>
                                                <InputLabel shrink>Type</InputLabel>
                                                <Select
                                                    {...register(`liabilities.${index}.type`, { required: true })}
                                                    defaultValue={field.type || ''}
                                                    disabled={disabled}
                                                    label="Type"
                                                >
                                                    <MenuItem value="Personal Loan">Personal Loan</MenuItem>
                                                    <MenuItem value="Real Estate Loan">Real Estate Loan</MenuItem>
                                                    <MenuItem value="Others">Others</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </div>
                                    </div>
                                    <div className="col-span-6 sm:col-span-3">
                                        <TextField
                                            {...register(`liabilities.${index}.amount`, { required: true })}
                                            type="number"
                                            label="Amount"
                                            margin="normal"
                                            fullWidth
                                            disabled={disabled}
                                            error={!!errors.liabilities?.[index]?.amount}
                                            helperText={errors.liabilities?.[index]?.amount?.message || ''}
                                        />
                                    </div>
                                    <Button
                                        type="button"
                                        variant="contained"
                                        color="error"
                                        onClick={() => removeLiability(index)}
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
                                onClick={() => appendLiability({ type: LiabilityType.PersonalLoan, amount: 0 })}
                                className="mt-2 text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
                                disabled={disabled}
                            >
                                Add Liability
                            </Button>
                        </div>


                    </div>

                    <div className="col-span-6 border border-gray-300 p-4 mb-4 rounded bg-slate-50">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="mb-4 text-xl font-semibold dark:text-white">Source Of Funds</h3>
                            <button
                                type="button"
                                className="bg-blue-500 text-white px-3 py-1 rounded"
                                onClick={() => setIsSourceOfFundCollapsed(!isSourceOfFundCollapsed)}
                            >
                                {isSourceOfFundCollapsed ? 'Expand' : 'Collapse'}
                            </button>
                        </div>
                        <div className={`${isSourceOfFundCollapsed ? 'hidden' : 'block'}`}>
                            {sourceOfFundFields.map((field, index) => (
                                <fieldset key={field.id} className={`border border-gray-300 p-4 mb-4 rounded`}>
                                    <legend className="text-sm font-medium text-gray-700 ">Fund {index + 1}</legend>
                                    <div className="grid grid-cols-6 gap-6 ">
                                        <div className="col-span-6 sm:col-span-3">
                                            <FormControl fullWidth margin="normal" error={!!errors.source_of_funds?.[index]?.type}>
                                                <InputLabel shrink>Type</InputLabel>
                                                <Select
                                                    {...register(`source_of_funds.${index}.type`, { required: true })}
                                                    defaultValue={field.type || ''}
                                                    disabled={disabled}
                                                    label="Type"
                                                >
                                                    <MenuItem value="Inheritance">Inheritance</MenuItem>
                                                    <MenuItem value="Donation">Donation</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </div>
                                    </div>
                                    <div className="col-span-6 sm:col-span-3">
                                        <TextField
                                            {...register(`source_of_funds.${index}.amount`, { required: true })}
                                            type="number"
                                            label="Amount"
                                            margin="normal"
                                            fullWidth
                                            disabled={disabled}
                                            error={!!errors.source_of_funds?.[index]?.amount}
                                            helperText={errors.source_of_funds?.[index]?.amount?.message || ''}
                                        />
                                    </div>
                                    <Button
                                        type="button"
                                        variant="contained"
                                        color="error"
                                        onClick={() => removeSourceOfFund(index)}
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
                                onClick={() => appendSourceOfFund({ type: SourceOfType.Inheritance, amount: 0 })}
                                className="mt-2 text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
                                disabled={disabled}
                            >
                                Add Source Of Fund
                            </Button>
                        </div>
                    </div>

                    <div className="col-span-6 border border-gray-300 p-4 mb-4 rounded">
                        <h3 className="mb-4 text-xl font-semibold dark:text-white">Investment Experience and Objectives</h3>
                        <div className="col-span-6 border border-gray-300 p-4 mb-4 rounded">
                            <TextField
                                {...register('net_worth')}
                                label="Net Worth"
                                margin="normal"
                                fullWidth
                                InputProps={{
                                    readOnly: true,
                                }}
                                disabled
                            />

                        </div>
                    </div>
                    <div className="col-span-6 border border-gray-300 p-4 mb-4 rounded">
                        <h3 className="mb-4 text-xl font-semibold dark:text-white">Investment Experience and Objectives</h3>
                        <div className="col-span-6 border border-gray-300 p-4 mb-4 rounded">
                            <FormControl component="fieldset" error={!!errors.experience}>
                                <FormLabel component="legend">Experience in Financial Markets</FormLabel>
                                <Controller
                                    rules={{ required: true }}
                                    control={control}
                                    name="experience"
                                    render={({ field }) => (
                                        <RadioGroup {...field}>
                                            <FormControlLabel
                                                disabled={disabled}
                                                value={Experience.LessThan5Years}
                                                control={<Radio />}
                                                label={Experience.LessThan5Years}
                                                defaultChecked
                                            />
                                            <FormControlLabel
                                                disabled={disabled}
                                                value={Experience.Between5And10Years}
                                                control={<Radio />}
                                                label={Experience.Between5And10Years}
                                            />
                                            <FormControlLabel
                                                disabled={disabled}
                                                value={Experience.MoreThan10Years}
                                                control={<Radio />}
                                                label={Experience.MoreThan10Years}
                                            />
                                        </RadioGroup>
                                    )}
                                />
                                {errors.experience && (
                                    <p className="text-red-500 text-xs">{errors.experience.message || 'This field is required'}</p>
                                )}
                            </FormControl>
                        </div>

                        {/* Risk Tolerance */}
                        <div className="col-span-6 border border-gray-300 p-4 mb-4 rounded">
                            <FormControl component="fieldset" error={!!errors.risk_tolerance}>
                                <FormLabel component="legend">Risk Tolerance</FormLabel>
                                <Controller

                                    rules={{ required: true }}
                                    control={control}
                                    name="risk_tolerance"
                                    render={({ field }) => (
                                        <RadioGroup
                                            {...field}>
                                            <FormControlLabel
                                                disabled={disabled}
                                                value={RiskTolerance.TenPercent}
                                                control={<Radio />}
                                                label={RiskTolerance.TenPercent}
                                                defaultChecked
                                            />
                                            <FormControlLabel
                                                disabled={disabled}
                                                value={RiskTolerance.ThirtyPercent}
                                                control={<Radio />}
                                                label={RiskTolerance.ThirtyPercent}
                                            />
                                            <FormControlLabel
                                                disabled={disabled}
                                                value={RiskTolerance.AllIn}
                                                control={<Radio />}
                                                label={RiskTolerance.AllIn}
                                            />
                                        </RadioGroup>
                                    )}
                                />
                                {errors.risk_tolerance && (
                                    <p className="text-red-500 text-xs">{errors.risk_tolerance.message || 'This field is required'}</p>
                                )}
                            </FormControl>
                        </div>
                    </div>
                    {
                        !disabled && (
                            <div className="col-span-6 sm:col-full">
                                <button
                                    className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                    type="submit">Create Review
                                </button>
                                <button
                                    onClick={() => navigate(`/pages/user/`)}
                                    type="button"
                                    className="ml-1 text-white bg-zinc-700 hover:bg-zinc-700 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                                    Cancel
                                </button>
                            </div>
                        )
                    }
                </div>
            </form>
        </>

    );
};

export default KYCForm;
