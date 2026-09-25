import { useEffect, useState } from "react";
import { Member } from "../types/Member";
import { getMembers, deleteMember } from "../api/memberApi";
import './Members.css';
import MemberForm from "../components/members/MemberForm";

export default function Members() {
    const [members, setMembers] = useState<Member[]>([]);
    const [selectedMembers, setSelectedMembers] = useState<Set<string>>(new Set());
    const [editingMember, setEditingMember] = useState<Member | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        getMembers()
            .then(setMembers)
            .catch((error) => console.error(error));
    }, []);

    function toggleMember(memberCode: string) {
        setSelectedMembers(prev => {
            const updated = new Set(prev);

            if (updated.has(memberCode)) {
                updated.delete(memberCode);
            } else {
                updated.add(memberCode);
            }

            return updated;
        });
    }

    async function handleDelete() {
        try {
            setError(null);

            for (const memberCode of selectedMembers) {
                await deleteMember(memberCode);
            }

            setMembers(prev =>
                prev.filter(member => !selectedMembers.has(member.memberCode))
            );

            setSelectedMembers(new Set());
        } catch (error) {
            setError(error instanceof Error ? error.message : "Failed to delete Member");
        }
    }

    const selectedCount = selectedMembers.size;

    return (
        <main>
            <h1>Members</h1>

            <div className="members-layout">
                <MemberForm
                    member={editingMember ?? undefined}
                    onMemberSaved={(savedMember) => {
                        setMembers(prev =>
                            prev.map(member =>
                                member.memberCode === savedMember.memberCode
                                    ? savedMember
                                    : member
                            )
                        );

                        setEditingMember(null);
                        setSelectedMembers(new Set());
                    }}
                />

                <div className="member-list">
                    <div className="member-rows">
                        {members.map((member) => (
                            <div
                                key={member.memberCode}
                                className={`member-row ${
                                    selectedMembers.has(member.memberCode)
                                        ? "selected"
                                        : ""
                                }`}
                                onClick={() => toggleMember(member.memberCode)}
                            >
                                <input
                                    type="checkbox"
                                    checked={selectedMembers.has(member.memberCode)}
                                    onChange={() => toggleMember(member.memberCode)}
                                    onClick={(event) => event.stopPropagation()}
                                />

                                <span>
                                    {member.first} {member.middle ? `${member.middle} ` : ""}{member.last}
                            </span>
                            </div>
                        ))}
                    </div>
                </div>

                {selectedCount > 0 && (
                    <div className="member-actions">
                        {selectedCount === 1 && (
                            <button
                                type="button"
                                onClick={() => {
                                    const memberCode = [...selectedMembers][0];
                                    const member = members.find(member => member.memberCode === memberCode);

                                    if (member) {
                                        setEditingMember(member);
                                    }
                                }}
                            >
                                Edit
                            </button>
                        )}

                        <button
                            type="button"
                            onClick={handleDelete}
                        >
                            Delete
                            {selectedCount > 1
                                ? ` (${selectedCount})`
                                : ""}
                        </button>

                        {error && (
                            <div className="delete-error">
                                {error}
                            </div>
                        )}

                    </div>
                )}
            </div>
        </main>
    );
}