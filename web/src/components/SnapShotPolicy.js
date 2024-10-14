import React, {useEffect} from 'react';

const SnapShotPolicy = ({handleSubmit, snapshot}) => {
    const [form, setForm] = React.useState({
        policyName: '',
        directory: '',
        schedule: {
            type: '',
            timeZone: '',
            time: '',
            days: '',
            deleteAfter: '',
        },
        isLocked: false,
    });

    useEffect(() => {
        setForm({
            policyName: snapshot?.policyName || '',
            directory: snapshot?.directory || '',
            schedule: {
                type: snapshot?.type || 'daily',
                timeZone: snapshot?.timeZone || 'America/Los_Angeles',
                time: snapshot?.time || '07:00',
                days: snapshot?.days || [],
                deleteAfter: snapshot?.deleteAfter || '',
            },
            isLocked: snapshot?.isLocked || false,
        })
    }, [snapshot])

    const handleInputChange = (e) => {
        const {name, value, type, checked} = e.target;
        setForm((prevForm) => ({
            ...prevForm,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleScheduleChange = (e) => {
        const {name, value, type, checked} = e.target;
        setForm((prevForm) => ({
            ...prevForm,
            schedule: {
                ...prevForm.schedule,
                [name]: type === 'checkbox' ? checked : value,
            }
        }));
    };

    const handleDayChange = (e, day) => {
        const {checked} = e.target;
        setForm((prevForm) => ({
            ...prevForm,
            schedule: {
                ...prevForm.schedule,
                days: checked
                    ? [...prevForm.schedule.days, day]
                    : prevForm.schedule.days.filter(d => d !== day)
            }
        }));
    };

    return (
        <div className="border border-[#283038] bg-[#1B222B] px-4 py-3">
            <h2 className="text-xl font-light mb-4">Edit Snapshot Policy</h2>
            <div>
                <form className="flex flex-col gap-6">
                    <div>
                        <label className="text-lg block text-[#C7CACC] font-normal mb-2">Policy Name</label>
                        <input
                            type="text"
                            name="policyName"
                            value={form.policyName}
                            onChange={handleInputChange}
                            className="text-lg block font-normal text-[#C7CACC] w-full border border-[#424B53] bg-[#424B5380] rounded p-2 ring-0"
                        />
                    </div>
                    <div>
                        <label className="text-lg block text-[#C7CACC] font-normal mb-2">Apply to Directory</label>
                        <div className="flex relative overflow-hidden">
                            <div
                                className='px-5 flex items-center bg-[#1B222C] border border-[#424B53] rounded rounded-tr-none rounded-br-none'>/
                            </div>
                            <input
                                type="text"
                                name="directory"
                                value={form.directory}
                                onChange={handleInputChange}
                                className="
                                text-lg block font-normal text-[#C7CACC] 
                                w-full p-2 border border-[#424B53] bg-[#424B5380]
                                rounded rounded-tl-none rounded-bl-none"/>
                        </div>
                    </div>
                    <p className='text-lg block text-[#C7CACC] font-normal mb-2'>Run policy on the following
                        schedule</p>
                    <div className="p-8 border border-[#424B53] bg-[#242C35]">
                        <div className="flex items-center gap-6 mt-2 mb-5 text-right">
                            <label
                                className="w-60 flex-shrink-0 flex-grow-0 basis-60 text-lg tex6-[#C7CACC] font-normal leading-normal">
                                Select Schedule Type
                            </label>
                            <select
                                name="type"
                                value={form.schedule.type}
                                onChange={handleScheduleChange}
                                className="text-lg block font-normal text-[#C7CACC] 
                                p-2 border border-[#424B53] bg-[#424B5380]
                                rounded min-w-[130px]"
                            >
                                <option value="daily">Daily</option>
                                <option value="weekly">Weekly</option>
                            </select>
                        </div>
                        <div className="flex items-center gap-6 mt-2 mb-5 text-right">
                            <label
                                className="w-60 flex-shrink-0 flex-grow-0 basis-60 text-lg tex6-[#C7CACC] font-normal leading-normal">
                                Set Time Zone
                            </label>
                            <select
                                name="timeZone"
                                value={form.schedule.timeZone}
                                onChange={handleScheduleChange}
                                className="text-lg block font-normal text-[#C7CACC] 
                                p-2 border border-[#424B53] bg-[#424B5380]
                                rounded min-w-[130px]"
                            >
                                <option value="America/Los_Angeles">America/Los Angeles</option>
                                <option value="Asia/Kolkata">Asia/Kolkata</option>
                                {/* Add other timezones here */}
                            </select>
                        </div>
                        <div className="flex items-center gap-6 mt-2 mb-5 text-right">
                            <label
                                className="w-60 flex-shrink-0 flex-grow-0 basis-60 text-lg tex6-[#C7CACC] font-normal leading-normal">
                                Take a Snapshot at
                            </label>
                            <input
                                type="time"
                                name="time"
                                value={form.schedule.time}
                                onChange={handleScheduleChange}
                                className="text-lg block font-normal text-[#C7CACC] 
                                p-2 border border-[#424B53] bg-[#424B5380]
                                rounded min-w-[130px]"
                            />
                        </div>
                        <div className="flex items-center gap-6 mt-2 mb-5 text-right">
                            <label
                                className="w-60 flex-shrink-0 flex-grow-0 basis-60 text-lg tex6-[#C7CACC] font-normal leading-normal">
                                On the Following Day(s)</label>
                            <div className="flex space-x-4 ml-5">
                                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                                    <label key={day} className="flex items-center space-x-2">
                                        <input
                                            type="checkbox"
                                            checked={form.schedule.days.includes(day)}
                                            onChange={(e) => handleDayChange(e, day)}
                                            className="form-checkbox text-blue-600"
                                        />
                                        <span className="text-white">{day}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div className="flex items-center gap-6 mt-2 mb-5 text-right">
                            <label
                                className="w-60 flex-shrink-0 flex-grow-0 basis-60 text-lg tex6-[#C7CACC] font-normal leading-normal">Delete
                                Each Snapshot</label>
                            <div className="flex items-center space-x-4 ml-5">
                                <label className="flex items-center space-x-2">
                                    <input
                                        type="radio"
                                        name="deleteAfter"
                                        value=""
                                        checked={!form.schedule.deleteAfter}
                                        onChange={handleScheduleChange}
                                        className="form-radio text-blue-600"
                                    />
                                    <span className="text-white">Never</span>
                                </label>
                                <label className="flex items-center space-x-2">
                                    <input
                                        type="radio"
                                        name="deleteAfter"
                                        value="after"
                                        checked={!!form.schedule.deleteAfter}
                                        onChange={handleScheduleChange}
                                        className="form-radio text-blue-600"
                                    />
                                    <span className="text-white">Automatically after</span>
                                </label>
                                <input
                                    type="number"
                                    name="deleteAfter"
                                    value={form.schedule.deleteAfter || ''}
                                    onChange={handleScheduleChange}
                                    disabled={!form.schedule.deleteAfter}
                                    className="bg-gray-700 p-3 text-white rounded w-16"
                                />
                                <span className="text-white">day(s)</span>
                            </div>
                        </div>

                    </div>

                    <div className="flex flex-col">
                        <h4 className="text-lg font-normal text-[#C7CACC] mb-2 leading-normal">Snapshot locking</h4>
                        <p className='text-base text-[#A6AAAE] leading-normal mb-2'>
                            Locked snapshots cannot be deleted before the deletion schedule expires. For this feature
                            to be available, snapshots must be set to automatically delete
                        </p>
                        <div className='flex items-center'>
                            <input
                                type="checkbox"
                                name="isLocked"
                                checked={form.isLocked}
                                onChange={handleInputChange}
                                className="form-checkbox text-blue-600 mr-2 w-4 h-4 bg-[#646B72]"
                            />
                            <label className="text-white">Enable locked snapshots</label>
                        </div>
                    </div>

                    <div className="flex justify-between items-center mt-5">
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                name="isPolicyEnabled"
                                checked={form.isPolicyEnabled}
                                onChange={handleInputChange}
                                className="form-checkbox text-blue-600 mr-2 w-4 h-4 bg-[#646B72]"
                            />
                            <span className="text-white">Enable policy</span>
                        </label>

                    </div>
                    <div className='flex items-center ga-4'>
                        <button
                            onClick={(e) => {
                                handleSubmit(e, form)
                            }}
                            className="py-2 px-4 rounded bg-[#007ACC] shadow-md text-lg text-[#FFFFFF] font-normal leading-tight"
                        >
                            Save Policy
                        </button>
                        <button className='py-2 px-4 rounded  text-lg text-[#0298FF] font-normal leading-tight'>Cancel</button>
                    </div>
                </form>
            </div>
        </div>

    )
}

export default SnapShotPolicy;
