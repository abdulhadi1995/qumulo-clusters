import React, {useEffect} from 'react';

const SnapShotPolicy = ({handleSubmit, snapshot}) => {
    const [form, setForm] = React.useState({
        policyName: '',
        directory : '',
        schedule: {
            type: '',
            timeZone: '',
            time: '',
            days: '',
            deleteAfter: '',
        },
        isLocked : false,
    });
    
    useEffect(()=>{
        setForm({
            policyName: snapshot?.policyName || '',
            directory : snapshot?.directory || '',
            schedule: {
                type: snapshot?.type || 'daily',
                timeZone: snapshot?.timeZone || 'America/Los_Angeles',
                time: snapshot?.time || '07:00',
                days: snapshot?.days || [],
                deleteAfter: snapshot?.deleteAfter || '',
            },
            isLocked : snapshot?.isLocked || false,
        })
    },[snapshot])

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm((prevForm) => ({
            ...prevForm,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleScheduleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm((prevForm) => ({
            ...prevForm,
            schedule: {
                ...prevForm.schedule,
                [name]: type === 'checkbox' ? checked : value,
            }
        }));
    };

    const handleDayChange = (e, day) => {
        const { checked } = e.target;
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
        <div className="flex-1 p-8 bg-gray-900">
            <header className="mb-8">
                <h2 className="text-3xl text-white">Edit Snapshot Policy</h2>
            </header>

            <div className="p-6 rounded">
                <form className="space-y-6">
                    <div>
                        <label className="block text-white text-lg">Policy Name</label>
                        <input
                            type="text"
                            name="policyName"
                            value={form.policyName}
                            onChange={handleInputChange}
                            className="bg-gray-700 p-3 text-white rounded w-full"
                        />
                    </div>
                    <div>
                        <label className="block text-white text-lg">Apply to Directory</label>
                        <input
                            type="text"
                            name="directory"
                            value={form.directory}
                            onChange={handleInputChange}
                            className="bg-gray-700 p-3 text-white rounded w-full"
                        />
                    </div>
                    <p>Run policy on the following schedule</p>
                    <div className="bg-gray-800 p-6 rounded">
                        <div className="flex items-center mt-2 mb-5">
                            <label className="block text-white text-lg">Select Schedule Type</label>
                            <select
                                name="type"
                                value={form.schedule.type}
                                onChange={handleScheduleChange}
                                className="bg-gray-700 p-3 text-white rounded ml-3"
                            >
                                <option value="daily">Daily</option>
                                <option value="weekly">Weekly</option>
                            </select>
                        </div>
                        <div className="flex items-center mt-2 mb-5">
                            <label className="block text-white text-lg">Set Time Zone</label>
                            <select
                                name="timeZone"
                                value={form.schedule.timeZone}
                                onChange={handleScheduleChange}
                                className="bg-gray-700 p-3 text-white rounded ml-3"
                            >
                                <option value="America/Los_Angeles">America/Los Angeles</option>
                                <option value="Asia/Kolkata">Asia/Kolkata</option>
                                {/* Add other timezones here */}
                            </select>
                        </div>
                        <div className="flex items-center mt-2 mb-5">
                            <label className="block text-white text-lg">Take a Snapshot at</label>
                            <input
                                type="time"
                                name="time"
                                value={form.schedule.time}
                                onChange={handleScheduleChange}
                                className="bg-gray-700 p-3 text-white rounded ml-3"
                            />
                        </div>
                        <div className="flex items-center mt-2 mb-5">
                            <label className="block text-white text-lg">On the Following Day(s)</label>
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

                        <div className="flex items-center mt-2 mb-5">
                            <label className="block text-white text-lg">Delete Each Snapshot</label>
                            <div className="flex space-x-4 ml-5">
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

                    <div className="flex flex-col space-x-4">
                        <h4 className="font-bold mt-4 mb-4">Snapshot locking</h4>
                        <p>
                            Locked snapshots cannot be deleted before the deletion schedule expires. For this feature
                            to be available, snapshots must be set to automatically delete
                        </p>
                        <div>
                            <input
                                type="checkbox"
                                name="isLocked"
                                checked={form.isLocked}
                                onChange={handleInputChange}
                                className="form-checkbox text-blue-600 mr-5"
                            />
                            <label className="text-white mr-5">Enable locked snapshots</label>
                        </div>
                    </div>

                    <div className="flex justify-between items-center">
                        <label className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                name="isPolicyEnabled"
                                checked={form.isPolicyEnabled}
                                onChange={handleInputChange}
                                className="form-checkbox text-blue-600"
                            />
                            <span className="text-white">Enable policy</span>
                        </label>

                    </div>
                    <button
                        onClick={(e)=>{handleSubmit(e, form)}}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
                    >
                        Save Policy
                    </button>
                </form>
            </div>
        </div>

    )
}

export default SnapShotPolicy;
