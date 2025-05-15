function AddEventHeader({ title, hasDes }) {
    return (
        <div className="flex flex-col gap-2 mb-2">
            <h1 className="text-[24px] font-bold text-text-dark tracking-[-0.5px]">{title}</h1>
            {hasDes && <p className="text-[16px] font-normal text-text-medium">Add New Events</p>}
        </div>
    )
}

export default AddEventHeader
