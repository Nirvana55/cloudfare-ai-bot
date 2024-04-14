import SidebarContent from "./SidebarContent";

type SideBarProps = {
  id?: string;
};

const Sidebar = (props: SideBarProps) => {
  const { id } = props;

  return (
    <div className='hidden border-r bg-muted/40 md:block '>
      <div className='fixed top-0 left-0 h-full max-h-screen md:w-[220px] lg:w-[280px]'>
        <SidebarContent id={id} />
      </div>
    </div>
  );
};

export default Sidebar;
