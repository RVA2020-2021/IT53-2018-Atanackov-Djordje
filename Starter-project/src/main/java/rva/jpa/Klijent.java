package rva.jpa;

import java.io.Serializable;
import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.util.List;


/**
 * The persistent class for the klijent database table.
 * 
 */
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Entity
@NamedQuery(name="Klijent.findAll", query="SELECT k FROM Klijent k")
public class Klijent implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@SequenceGenerator(name="KLIJENT_ID_GENERATOR", sequenceName="KLIJENT_SEQ", allocationSize = 1)
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="KLIJENT_ID_GENERATOR")
	private Integer id;

	@Column(name="borj_lk")
	private Integer borjLk;

	private String ime;

	private String prezime;

	//bi-directional many-to-one association to Kredit
	@ManyToOne
	@JoinColumn(name="kredit")
	private Kredit kredit;

	//bi-directional many-to-one association to Racun
	@JsonIgnore
	@OneToMany(mappedBy="klijent")
	private List<Racun> racuns;

	public Klijent() {
	}

	public Integer getId() {
		return this.id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Integer getBorjLk() {
		return this.borjLk;
	}

	public void setBorjLk(Integer borjLk) {
		this.borjLk = borjLk;
	}

	public String getIme() {
		return this.ime;
	}

	public void setIme(String ime) {
		this.ime = ime;
	}

	public String getPrezime() {
		return this.prezime;
	}

	public void setPrezime(String prezime) {
		this.prezime = prezime;
	}

	public Kredit getKredit() {
		return this.kredit;
	}

	public void setKredit(Kredit kredit) {
		this.kredit = kredit;
	}

	public List<Racun> getRacuns() {
		return this.racuns;
	}

	public void setRacuns(List<Racun> racuns) {
		this.racuns = racuns;
	}

	public Racun addRacun(Racun racun) {
		getRacuns().add(racun);
		racun.setKlijent(this);

		return racun;
	}

	public Racun removeRacun(Racun racun) {
		getRacuns().remove(racun);
		racun.setKlijent(null);

		return racun;
	}

}