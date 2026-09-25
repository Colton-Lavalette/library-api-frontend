import React, { useEffect, useState } from 'react';
import { Member } from '../../types/Member';
import './MemberForm.css';


interface MemberFormProps {
    member?: Member;
    onMemberSaved: (member: Member) => void;
}

function MemberForm({ member, onMemberSaved }: MemberFormProps) {
    const [formData, setFormData] = useState({
        first: '',
        middle: '',
        last: '',
        email: ''
    });

    useEffect(() => {
        if (member) {
            setFormData({
                first: member.first,
                middle: member.middle,
                last: member.last,
                email: member.email
            });
        }
    }, [member]);

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;

        setFormData(prev => ({ ...prev, [name]: value }));
    }

    async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
        event.preventDefault();

        try {
            if (member) {
                const response = await fetch(
                    `http://localhost:8080/members/${member.memberCode}`,
                    {
                        method: 'PATCH',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(formData),
                    }
                );

                if (!response.ok) {
                    const error = await response.json();
                    console.error(
                        'Failed to update member:',
                        error.message || response.status
                    );
                    return;
                }

                const responseBody = await response.json();
                const updatedMember = responseBody.data;

                onMemberSaved(updatedMember);
            } else {
                const response = await fetch('http://localhost:8080/members', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData),
                });

                if (!response.ok) {
                    const error = await response.json();
                    console.error(
                        'Failed to create member:',
                        error.message || response.status
                    );
                    return;
                }

                const responseBody = await response.json();
                const createdMember = responseBody.data;

                onMemberSaved(createdMember);
            }

            setFormData({
                first: '',
                middle: '',
                last: '',
                email: ''
            });
        } catch (error) {
            console.error('Network error:', error);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="member-form">
            <h2>{member ? "Edit Member" : "Add Member"}</h2>
            <label>
                First:
                <input required type="text" name="first" value={formData.first} onChange={handleChange} />
            </label>
            <label>
                Middle:
                <input type="text" name="middle" value={formData.middle} onChange={handleChange} />
            </label>
            <label>
                Last:
                <input required type="text" name="last" value={formData.last} onChange={handleChange} />
            </label>
            <label>
                Email:
                <input required type="text" name="email" value={formData.email} onChange={handleChange} />
            </label>
            <button type="submit">
                {member ? "Update" : "Submit"}
            </button>
        </form>
    );

}

export default MemberForm;