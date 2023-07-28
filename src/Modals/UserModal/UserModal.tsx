import css from './UserModal.module.scss';

interface UserModalProps {
  avatar: string;
  name: string;
  email: string;
}

const UserModal = ({ avatar, name, email }: UserModalProps) => {
  return (
    <div className={css.wrap}>
      <div className={css.avatar}>
        <img src={avatar} alt={name} />
      </div>
      <div className={css.info}>
        <h1>{name}</h1>
        <span>{email}</span>
      </div>
    </div>
  );
};

export default UserModal;
